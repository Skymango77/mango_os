/**
 * MANGO VAULT SECURITY ENGINE 8.0
 * Server-side Blockchain Verification & E2EE Key Management
 */

const axios = require('axios');
const crypto = require('crypto');

// Configuration - In production, these should be in .env
const PI_API_URL = "https://api.minepi.com/v2";
const SERVER_API_KEY = process.env.PI_SERVER_KEY; 

/**
 * Verify Pi Payment via Server-to-Server API
 * This prevents client-side spoofing of transaction data.
 */
const verifyPiPayment = async (paymentId, txid) => {
  try {
    // 1. Fetch payment details from Pi Network Horizon servers
    // This step is critical to prevent client-side spoofing.
    const response = await axios.get(`${PI_API_URL}/payments/${paymentId}`, {
      headers: { 'Authorization': `Key ${SERVER_API_KEY}` }
    });

    const payment = response.data;

    // 2. Validate the critical transaction data
    const isTxValid = payment.transaction && payment.transaction.txid === txid;
    const isCleared = payment.status.cleared === true;
    const isApproved = payment.status.developer_approved === true;

    if (isTxValid && isCleared && isApproved) {
      return {
        success: true,
        amount: payment.amount,
        recipient: payment.recipient,
        memo: payment.memo
      };
    }

    return { success: false, error: "Transaction verification mismatch." };

  } catch (error) {
    console.error("[MangoVault] Blockchain verification failed:", error.message);
    return { success: false, error: "Pi Network Horizon API unreachable." };
  }
};

/**
 * Generate Stealth Key for Ghost Protocol
 * Generates a one-time derived key for anonymous encrypted sessions.
 */
const generateStealthKey = (userId) => {
  const timestamp = Date.now().toString();
  const seed = userId + timestamp + process.env.JWT_SECRET;
  
  // Generate a SHA-256 hash to act as the session stealth key
  return crypto
    .createHash('sha256')
    .update(seed)
    .digest('hex')
    .substring(0, 16); // Use a 16-char slice for the UI display
};

module.exports = {
  verifyPiPayment,
  generateStealthKey
};