const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const passport = require('passport');

// Middleware to ensure authentication
const authenticate = passport.authenticate('jwt', { session: false });

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Customer's full name
 *         email:
 *           type: string
 *           format: email
 *           description: Customer's email address
 *         phone:
 *           type: string
 *           description: Customer's phone number
 *         totalSpent:
 *           type: number
 *           description: Total amount spent by customer
 *         visitCount:
 *           type: number
 *           description: Number of times customer has visited
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Customer's status
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Save customer to MongoDB
    const customer = new Customer({ name, email, phone });
    await customer.save();

    res.status(201).json({ message: 'Customer created successfully', customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for customer name
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    
    const customers = await Customer.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Customer.countDocuments(query);

    res.json({
      customers,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 */
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    
    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: error.message });
  }
});

// Seed sample customers
router.post('/seed', async (req, res) => {
  try {
    const sampleCustomers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        spend: 25000,
        visits: 15,
        inactive_days: 5,
        total_orders: 8,
        avg_order_value: 3125
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        spend: 18000,
        visits: 25,
        inactive_days: 2,
        total_orders: 12,
        avg_order_value: 1500
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        spend: 30000,
        visits: 8,
        inactive_days: 10,
        total_orders: 5,
        avg_order_value: 6000
      },
      {
        name: 'Alice Brown',
        email: 'alice@example.com',
        spend: 15000,
        visits: 30,
        inactive_days: 1,
        total_orders: 15,
        avg_order_value: 1000
      },
      {
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        spend: 22000,
        visits: 18,
        inactive_days: 3,
        total_orders: 10,
        avg_order_value: 2200
      }
    ];

    await Customer.insertMany(sampleCustomers);
    res.json({ message: 'Sample customers added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;