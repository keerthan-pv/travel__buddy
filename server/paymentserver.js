const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request body

// Route to create a mock order
app.post('/create-order', (req, res) => {
  const { amount, packageName } = req.body;

  // Simulate an order creation with a random order ID
  const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;
  console.log(`Created mock order: ${orderId} for package: ${packageName} with amount ₹${amount}`);

  // Return the mock order ID to the frontend
  res.json({ orderId, packageName });
});

// Route to verify mock payment status
app.post('/verify-payment', (req, res) => {
  const { orderId, paymentStatus } = req.body;
  console.log("Received payment verification request:", req.body); // Log incoming data

  // Simulate payment verification
  if (paymentStatus === 'success') {
    console.log(`Payment for order ${orderId} was successful.`);
    res.json({ status: 'success', message: 'Payment was successful!' });
  } else {
    console.log(`Payment for order ${orderId} failed.`);
    res.json({ status: 'failed', message: 'Payment failed. Please try again!' });
  }
});

// Start the server on port 5000
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
