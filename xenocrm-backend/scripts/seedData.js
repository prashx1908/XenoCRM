const mongoose = require('mongoose');
const Customer = require('../models/Customer');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Sample customer data
const customers = [
  {
    name: 'John Doe', email: 'john.doe@techcorp.com', company: 'Tech Corp', status: 'CUSTOMER', spend: 15000, total_orders: 5, avg_order_value: 3000, inactive_days: 5, createdAt: new Date('2024-01-01')
  },
  {
    name: 'Jane Smith', email: 'jane.smith@marketinginc.com', company: 'Marketing Inc', status: 'LEAD', spend: 5000, total_orders: 2, avg_order_value: 2500, inactive_days: 15, createdAt: new Date('2024-02-01')
  },
  {
    name: 'Bob Johnson', email: 'bob.johnson@salesco.com', company: 'Sales Co', status: 'PROSPECT', spend: 0, total_orders: 0, avg_order_value: 0, inactive_days: 45, createdAt: new Date('2024-03-01')
  },
  {
    name: 'Alice Brown', email: 'alice.brown@designstudio.com', company: 'Design Studio', status: 'CUSTOMER', spend: 25000, total_orders: 8, avg_order_value: 3125, inactive_days: 2, createdAt: new Date('2024-01-15')
  },
  {
    name: 'Charlie Wilson', email: 'charlie.wilson@consultingltd.com', company: 'Consulting Ltd', status: 'CUSTOMER', spend: 75000, total_orders: 15, avg_order_value: 5000, inactive_days: 0, createdAt: new Date('2024-02-15')
  },
  {
    name: 'Priya Patel', email: 'priya.patel@fintechhub.com', company: 'Fintech Hub', status: 'LEAD', spend: 12000, total_orders: 3, avg_order_value: 4000, inactive_days: 10, createdAt: new Date('2024-03-10')
  },
  {
    name: 'Liam Nguyen', email: 'liam.nguyen@edusolutions.com', company: 'Edu Solutions', status: 'CUSTOMER', spend: 18000, total_orders: 6, avg_order_value: 3000, inactive_days: 7, createdAt: new Date('2024-01-20')
  },
  {
    name: 'Sofia Garcia', email: 'sofia.garcia@healthplus.com', company: 'Health Plus', status: 'PROSPECT', spend: 0, total_orders: 0, avg_order_value: 0, inactive_days: 60, createdAt: new Date('2024-04-01')
  },
  {
    name: 'David Kim', email: 'david.kim@retailgiant.com', company: 'Retail Giant', status: 'CUSTOMER', spend: 32000, total_orders: 10, avg_order_value: 3200, inactive_days: 3, createdAt: new Date('2024-02-10')
  },
  {
    name: 'Emily Chen', email: 'emily.chen@travelworld.com', company: 'Travel World', status: 'LEAD', spend: 8000, total_orders: 2, avg_order_value: 4000, inactive_days: 20, createdAt: new Date('2024-03-05')
  },
  {
    name: 'Mohammed Ali', email: 'mohammed.ali@logisticspro.com', company: 'Logistics Pro', status: 'CUSTOMER', spend: 27000, total_orders: 9, avg_order_value: 3000, inactive_days: 1, createdAt: new Date('2024-01-25')
  },
  {
    name: 'Olivia Martin', email: 'olivia.martin@fashionista.com', company: 'Fashionista', status: 'CUSTOMER', spend: 22000, total_orders: 7, avg_order_value: 3142, inactive_days: 4, createdAt: new Date('2024-02-18')
  },
  {
    name: 'Lucas Rossi', email: 'lucas.rossi@foodies.com', company: 'Foodies', status: 'LEAD', spend: 6000, total_orders: 2, avg_order_value: 3000, inactive_days: 18, createdAt: new Date('2024-03-12')
  },
  {
    name: 'Ava Lee', email: 'ava.lee@meditech.com', company: 'MediTech', status: 'PROSPECT', spend: 0, total_orders: 0, avg_order_value: 0, inactive_days: 50, createdAt: new Date('2024-04-10')
  },
  {
    name: 'Noah Clark', email: 'noah.clark@greenenergy.com', company: 'Green Energy', status: 'CUSTOMER', spend: 41000, total_orders: 12, avg_order_value: 3416, inactive_days: 2, createdAt: new Date('2024-01-30')
  },
  {
    name: 'Mia Singh', email: 'mia.singh@startupzone.com', company: 'Startup Zone', status: 'LEAD', spend: 9500, total_orders: 3, avg_order_value: 3166, inactive_days: 12, createdAt: new Date('2024-03-15')
  },
  {
    name: 'Ethan Brown', email: 'ethan.brown@autohub.com', company: 'AutoHub', status: 'CUSTOMER', spend: 37000, total_orders: 11, avg_order_value: 3363, inactive_days: 6, createdAt: new Date('2024-02-12')
  },
  {
    name: 'Isabella Lopez', email: 'isabella.lopez@beautybox.com', company: 'Beauty Box', status: 'CUSTOMER', spend: 29000, total_orders: 8, avg_order_value: 3625, inactive_days: 3, createdAt: new Date('2024-01-28')
  },
  {
    name: 'William Evans', email: 'william.evans@finadvisors.com', company: 'FinAdvisors', status: 'PROSPECT', spend: 0, total_orders: 0, avg_order_value: 0, inactive_days: 70, createdAt: new Date('2024-04-15')
  },
  {
    name: 'Sophia Turner', email: 'sophia.turner@eventify.com', company: 'Eventify', status: 'CUSTOMER', spend: 16000, total_orders: 5, avg_order_value: 3200, inactive_days: 8, createdAt: new Date('2024-02-22')
  },
  {
    name: 'Benjamin Scott', email: 'benjamin.scott@techies.com', company: 'Techies', status: 'LEAD', spend: 7000, total_orders: 2, avg_order_value: 3500, inactive_days: 16, createdAt: new Date('2024-03-18')
  },
  {
    name: 'Chloe Adams', email: 'chloe.adams@wellnesshub.com', company: 'Wellness Hub', status: 'CUSTOMER', spend: 19500, total_orders: 6, avg_order_value: 3250, inactive_days: 5, createdAt: new Date('2024-01-18')
  },
  {
    name: 'James Baker', email: 'james.baker@bizconnect.com', company: 'BizConnect', status: 'CUSTOMER', spend: 26000, total_orders: 9, avg_order_value: 2888, inactive_days: 2, createdAt: new Date('2024-02-25')
  },
  {
    name: 'Ella Murphy', email: 'ella.murphy@creativelabs.com', company: 'Creative Labs', status: 'LEAD', spend: 11000, total_orders: 4, avg_order_value: 2750, inactive_days: 9, createdAt: new Date('2024-03-20')
  },
  {
    name: 'Henry Walker', email: 'henry.walker@marketwise.com', company: 'MarketWise', status: 'PROSPECT', spend: 0, total_orders: 0, avg_order_value: 0, inactive_days: 55, createdAt: new Date('2024-04-12')
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await Customer.deleteMany({});
    console.log('Cleared existing customer data');

    // Insert new data
    await Customer.insertMany(customers);
    console.log('Successfully seeded customer data');

    // Verify the data
    const count = await Customer.countDocuments();
    console.log(`Total customers in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 