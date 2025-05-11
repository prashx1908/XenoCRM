const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');
const { TOPICS } = require('../config/kafka');

// Process customer creation
async function handleCustomerCreated(data) {
  try {
    const customer = new Customer(data);
    await customer.save();
    console.log('Customer created successfully:', customer._id);
  } catch (error) {
    console.error('Error processing customer creation:', error);
    throw error;
  }
}

// Process customer update
async function handleCustomerUpdated(data) {
  try {
    const customer = await Customer.findByIdAndUpdate(
      data._id,
      data,
      { new: true, runValidators: true }
    );
    console.log('Customer updated successfully:', customer._id);
  } catch (error) {
    console.error('Error processing customer update:', error);
    throw error;
  }
}

// Process order creation
async function handleOrderCreated(data) {
  try {
    const order = new Order(data);
    await order.save();

    // Update customer stats
    const customer = await Customer.findById(data.customer);
    if (customer) {
      customer.totalSpent += order.amount;
      customer.visitCount += 1;
      customer.lastVisitDate = new Date();
      await customer.save();
    }

    console.log('Order created successfully:', order._id);
  } catch (error) {
    console.error('Error processing order creation:', error);
    throw error;
  }
}

// Process order update
async function handleOrderUpdated(data) {
  try {
    const order = await Order.findByIdAndUpdate(
      data._id,
      data,
      { new: true, runValidators: true }
    );
    console.log('Order updated successfully:', order._id);
  } catch (error) {
    console.error('Error processing order update:', error);
    throw error;
  }
}

// Process campaign creation
async function handleCampaignCreated(data) {
  try {
    const campaign = new Campaign(data);
    await campaign.save();
    console.log('Campaign created successfully:', campaign._id);
  } catch (error) {
    console.error('Error processing campaign creation:', error);
    throw error;
  }
}

// Process campaign delivery
async function handleCampaignDelivered(data) {
  try {
    const log = new CommunicationLog(data);
    await log.save();
    console.log('Campaign delivery logged successfully:', log._id);
  } catch (error) {
    console.error('Error processing campaign delivery:', error);
    throw error;
  }
}

// Message handler map
const messageHandlers = {
  [TOPICS.CUSTOMER_CREATED]: handleCustomerCreated,
  [TOPICS.CUSTOMER_UPDATED]: handleCustomerUpdated,
  [TOPICS.ORDER_CREATED]: handleOrderCreated,
  [TOPICS.ORDER_UPDATED]: handleOrderUpdated,
  [TOPICS.CAMPAIGN_CREATED]: handleCampaignCreated,
  [TOPICS.CAMPAIGN_DELIVERED]: handleCampaignDelivered
};

module.exports = {
  messageHandlers
}; 