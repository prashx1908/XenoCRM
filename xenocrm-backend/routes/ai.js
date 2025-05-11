const express = require('express');
const router = express.Router();

function getMessageSuggestions(objective) {
  const lower = objective.toLowerCase();

  // Loyal/Active/Frequent Users
  if (/(active|loyal|frequent|regular|engaged|consistent)/.test(lower)) {
    return [
      "Thank you for being a loyal customer! Enjoy this exclusive reward.",
      "Your consistent support means the world to us. Here's a special offer just for you.",
      "We appreciate your regular visits. Enjoy this perk as a token of our gratitude!",
      "Because you're one of our most engaged users, here's something special.",
      "Loyalty deserves recognition! Please accept this exclusive deal.",
      "Your continued engagement inspires us. Enjoy this unique offer!"
    ];
  }

  // Inactive/Winback/Return
  if (/(inactive|return|winback|comeback|re-engage|dormant|lost)/.test(lower)) {
    return [
      "We miss you! Come back and enjoy a special offer just for you.",
      "It's been a while! Here's something to welcome you back.",
      "We'd love to see you again. Enjoy this exclusive deal on your return!",
      "Your presence has been missed! Here's a comeback reward.",
      "Ready to reconnect? We have a special offer waiting for you.",
      "Let's make your return memorable with this unique deal!"
    ];
  }

  // New Customer/Welcome
  if (/(new|first time|welcome|just joined|recently joined)/.test(lower)) {
    return [
      "Welcome to our community! Here's a special offer to get you started.",
      "Thank you for joining us! Enjoy this welcome gift.",
      "We're excited to have you! Here's a little something for your first experience.",
      "New beginnings deserve special rewards. Enjoy this exclusive offer!",
      "Kickstart your journey with us with this welcome deal.",
      "We're thrilled you chose us! Here's a gift to say thanks."
    ];
  }

  // High Value/Premium
  if (/(premium|vip|high value|top tier|elite|exclusive)/.test(lower)) {
    return [
      "As a premium member, you deserve the best. Enjoy this exclusive offer!",
      "VIP treatment just for you—here's a special deal.",
      "Elite customers like you get elite rewards. Enjoy!",
      "Thank you for being a top-tier customer. Here's something special.",
      "Exclusive access for our valued VIPs—claim your reward!",
      "You're among our best! Enjoy this premium offer."
    ];
  }

  // Discount/Deal/Sale
  if (/(discount|deal|sale|offer|save|bargain|special)/.test(lower)) {
    return [
      "Don't miss this limited-time deal! Save big today.",
      "Special offer just for you—grab it before it's gone!",
      "Unlock amazing savings with this exclusive discount.",
      "Enjoy this bargain—because you deserve great value.",
      "Sale alert! Take advantage of this special offer now.",
      "Save more with this unique deal crafted for you."
    ];
  }

  // Default templates
  return [
    `Don't miss out! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Enjoy an exclusive offer just for you!`,
    `We're thinking of you! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Come back and get a special deal!`,
    `It's time to reconnect! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Unlock your next reward today!`,
    `Here's something special: ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Don't miss this opportunity!`,
    `Exclusive for you: ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Claim your offer now!`,
    `Act now! ${objective.charAt(0).toUpperCase() + objective.slice(1)}. Limited time only!`
  ];
}

router.post('/message-suggestions', async (req, res) => {
  try {
    const { objective } = req.body;
    if (!objective) {
      return res.status(400).json({ message: 'Objective is required' });
    }

    const templates = getMessageSuggestions(objective);
    res.json({ suggestions: templates });
  } catch (error) {
    console.error('Error generating rule-based suggestions:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
});

module.exports = router; 