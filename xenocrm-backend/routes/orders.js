const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const passport = require('passport');

// Middleware to ensure authentication
const authenticate = passport.authenticate('jwt', { session: false });

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { customerId, items, totalAmount } = req.body;

    // Validate input
    if (!customerId || !items || !totalAmount) {
      return res.status(400).json({ error: 'Customer ID, items, and total amount are required' });
    }

    // Save order to MongoDB
    const order = new Order({ customerId, items, totalAmount });
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all orders
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.find().populate('customer');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // Validate input
    if (!items || !totalAmount) {
      return res.status(400).json({ error: 'Items and total amount are required' });
    }

    // Update order in MongoDB
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { items, totalAmount },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete order
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update customer's total spent
    const customer = await Customer.findById(order.customer);
    if (customer) {
      customer.totalSpent -= order.amount;
      await customer.save();
    }

    await order.remove();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;