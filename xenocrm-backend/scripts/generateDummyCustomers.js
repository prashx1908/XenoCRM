const mongoose = require('mongoose');
const Customer = require('../models/Customer');
require('dotenv').config();

// Helper function to generate random number within range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random date within last year
const getRandomDate = () => {
  const now = new Date();
  const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
};

// Helper function to generate random company name
const getRandomCompany = () => {
  const companies = [
    'Tech Solutions Inc.',
    'Global Innovations Ltd.',
    'Digital Dynamics',
    'Future Systems',
    'Smart Technologies',
    'Cloud Computing Co.',
    'Data Analytics Corp',
    'AI Solutions',
    'Web Services Ltd',
    'Mobile Apps Inc'
  ];
  return companies[Math.floor(Math.random() * companies.length)];
};

// Generate dummy customer data
const generateDummyCustomers = async (count = 100) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing customers
    await Customer.deleteMany({});
    console.log('Cleared existing customers');

    const customers = [];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'Robert', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const usedEmails = new Set();

    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      // Generate unique email
      let email;
      do {
        const randomNum = getRandomNumber(1000, 9999);
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@example.com`;
      } while (usedEmails.has(email));
      usedEmails.add(email);

      const company = getRandomCompany();
      const phone = `+1${getRandomNumber(2000000000, 9999999999)}`;
      
      // Generate realistic customer metrics
      const total_orders = getRandomNumber(1, 50);
      const avg_order_value = getRandomNumber(100, 5000);
      const spend = total_orders * avg_order_value;
      const visits = getRandomNumber(total_orders, total_orders * 3);
      const inactive_days = getRandomNumber(0, 90);
      
      const customer = {
        name,
        email,
        company,
        phone,
        spend,
        visits,
        inactive_days,
        total_orders,
        avg_order_value,
        status: ['LEAD', 'PROSPECT', 'CUSTOMER', 'INACTIVE'][Math.floor(Math.random() * 4)],
        createdAt: getRandomDate(),
        updatedAt: new Date()
      };

      customers.push(customer);
    }

    // Insert customers in batches of 10
    for (let i = 0; i < customers.length; i += 10) {
      const batch = customers.slice(i, i + 10);
      await Customer.insertMany(batch);
      console.log(`Inserted customers ${i + 1} to ${i + batch.length}`);
    }

    console.log('Successfully generated dummy customer data');
    process.exit(0);
  } catch (error) {
    console.error('Error generating dummy data:', error);
    process.exit(1);
  }
};

// Run the script
generateDummyCustomers(); 