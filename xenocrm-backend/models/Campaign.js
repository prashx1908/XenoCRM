const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  field: {
    type: String,
    required: true,
    enum: ['spend', 'visits', 'inactive_days', 'total_orders', 'avg_order_value']
  },
  operator: {
    type: String,
    required: true,
    enum: ['>', '<', '=', '>=', '<=', 'contains', 'starts_with', 'ends_with']
  },
  value: {
    type: String,
    required: true
  }
});

const ruleGroupSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  operator: {
    type: String,
    required: true,
    enum: ['AND', 'OR'],
    default: 'AND'
  },
  rules: [ruleSchema]
});

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  ruleGroups: [ruleGroupSchema],
  status: {
    type: String,
    enum: ['draft', 'completed'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
campaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema); 