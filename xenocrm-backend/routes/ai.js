const express = require('express');
const router = express.Router();

// POST /api/ai/message-suggestions
router.post('/message-suggestions', async (req, res) => {
  try {
    const { objective } = req.body;
    if (!objective) {
      return res.status(400).json({ message: 'Objective is required' });
    }

    // Simple rules-based message suggestions
    const templates = [
      `Don't miss out! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Enjoy an exclusive offer just for you!`,
      `We're thinking of you! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Come back and get a special deal!`,
      `It's time to reconnect! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Unlock your next reward today!`
    ];

    res.json({ suggestions: templates });
  } catch (error) {
    console.error('Error generating rule-based suggestions:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
});

module.exports = router; 