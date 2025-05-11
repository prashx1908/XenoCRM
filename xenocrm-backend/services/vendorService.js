const axios = require('axios');

class VendorService {
  constructor() {
    this.baseUrl = process.env.VENDOR_API_URL || 'http://localhost:3000';
    this.successRate = 0.9; // 90% success rate
  }

  async sendMessage(message, customer) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

      // Simulate success/failure
      const isSuccess = Math.random() < this.successRate;

      if (!isSuccess) {
        throw new Error('Simulated delivery failure');
      }

      // Simulate vendor API response
      const receipt = {
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        status: 'delivered',
        metadata: {
          vendor: 'simulated_vendor',
          channel: 'email',
          attempt: 1
        }
      };

      // Send delivery receipt to our API
      await this.sendDeliveryReceipt({
        logId: message.logId,
        status: 'delivered',
        receipt
      });

      return receipt;
    } catch (error) {
      // Send failure receipt
      await this.sendDeliveryReceipt({
        logId: message.logId,
        status: 'failed',
        errorMessage: error.message,
        receipt: {
          timestamp: new Date().toISOString(),
          status: 'failed',
          error: error.message
        }
      });

      throw error;
    }
  }

  async sendDeliveryReceipt(receipt) {
    try {
      await axios.post(`${this.baseUrl}/api/campaigns/delivery-receipt`, {
        logs: [receipt]
      });
    } catch (error) {
      console.error('Error sending delivery receipt:', error);
      // In a real system, we might want to retry or queue this
    }
  }
}

module.exports = new VendorService(); 