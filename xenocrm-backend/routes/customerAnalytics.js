const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Error handling middleware
const handleError = (res, error) => {
  console.error('Error:', error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

// Get overall customer metrics
router.get('/metrics', async (req, res) => {
  try {
    console.log('Fetching customer metrics...');
    const totalCustomers = await Customer.countDocuments();
    console.log('Total customers:', totalCustomers);
    
    const activeCustomers = await Customer.countDocuments({ status: 'CUSTOMER' });
    console.log('Active customers:', activeCustomers);
    
    const leads = await Customer.countDocuments({ status: 'LEAD' });
    const prospects = await Customer.countDocuments({ status: 'PROSPECT' });
    
    const totalSpend = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: '$spend' } } }
    ]);
    console.log('Total spend:', totalSpend);
    
    const avgOrderValue = await Customer.aggregate([
      { $group: { _id: null, average: { $avg: '$avg_order_value' } } }
    ]);
    console.log('Average order value:', avgOrderValue);

    const inactiveCustomers = await Customer.countDocuments({ inactive_days: { $gt: 30 } });

    const response = {
      totalCustomers,
      activeCustomers,
      leads,
      prospects,
      totalSpend: totalSpend[0]?.total || 0,
      avgOrderValue: Math.round(avgOrderValue[0]?.average || 0),
      inactiveCustomers
    };
    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error in /metrics:', error);
    handleError(res, error);
  }
});

// Get customer segmentation by status
router.get('/segmentation/status', async (req, res) => {
  try {
    console.log('Fetching customer segmentation...');
    const segmentation = await Customer.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalSpend: { $sum: '$spend' },
          avgOrderValue: { $avg: '$avg_order_value' }
        }
      }
    ]);
    console.log('Segmentation data:', segmentation);
    res.json(segmentation);
  } catch (error) {
    console.error('Error in /segmentation/status:', error);
    handleError(res, error);
  }
});

// Get customer activity analysis
router.get('/activity', async (req, res) => {
  try {
    console.log('Fetching customer activity...');
    const activityRanges = [
      { range: '0-7', min: 0, max: 7 },
      { range: '8-15', min: 8, max: 15 },
      { range: '16-30', min: 16, max: 30 },
      { range: '31-60', min: 31, max: 60 },
      { range: '60+', min: 61, max: 999 }
    ];

    const activityAnalysis = await Promise.all(
      activityRanges.map(async ({ range, min, max }) => {
        const count = await Customer.countDocuments({
          inactive_days: { $gte: min, $lte: max }
        });
        return { range, count };
      })
    );
    console.log('Activity analysis:', activityAnalysis);
    res.json(activityAnalysis);
  } catch (error) {
    console.error('Error in /activity:', error);
    handleError(res, error);
  }
});

// Get spending analysis
router.get('/spending', async (req, res) => {
  try {
    console.log('Fetching spending analysis...');
    const spendingRanges = [
      { range: '0-1000', min: 0, max: 1000 },
      { range: '1001-5000', min: 1001, max: 5000 },
      { range: '5001-10000', min: 5001, max: 10000 },
      { range: '10001-50000', min: 10001, max: 50000 },
      { range: '50000+', min: 50001, max: 999999 }
    ];

    const spendingAnalysis = await Promise.all(
      spendingRanges.map(async ({ range, min, max }) => {
        const count = await Customer.countDocuments({
          spend: { $gte: min, $lte: max }
        });
        return { range, count };
      })
    );
    console.log('Spending analysis:', spendingAnalysis);
    res.json(spendingAnalysis);
  } catch (error) {
    console.error('Error in /spending:', error);
    handleError(res, error);
  }
});

// Get top customers by spend
router.get('/top-customers', async (req, res) => {
  try {
    console.log('Fetching top customers...');
    const topCustomers = await Customer.find()
      .sort({ spend: -1 })
      .limit(10)
      .select('name email company spend total_orders avg_order_value');
    console.log('Top customers:', topCustomers);
    res.json(topCustomers);
  } catch (error) {
    console.error('Error in /top-customers:', error);
    handleError(res, error);
  }
});

// Get customer growth over time
router.get('/growth', async (req, res) => {
  try {
    console.log('Fetching customer growth...');
    const growthData = await Customer.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    console.log('Growth data:', growthData);
    res.json(growthData);
  } catch (error) {
    console.error('Error in /growth:', error);
    handleError(res, error);
  }
});

module.exports = router; 