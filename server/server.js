const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your frontend (React running on port 3000)
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust if React is running on a different port
}));

// Enable JSON body parsing for POST requests
app.use(express.json());

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  console.log('Received request body:', req.body);  // Log the incoming data

  const { name, phone, email, message } = req.body;

  // Basic validation checks
  if (!name || !phone || !email || !message) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  // Phone number validation (must be 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).send({ message: 'Please enter a valid 10-digit phone number.' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Please enter a valid email address.' });
  }

  // Log the valid data
  console.log('Valid contact submission:', { name, phone, email, message });

  // Simulate saving data (e.g., database or file)
  // Example: Here you would save it to a database if needed
  
  // Respond back with a success message
  res.status(200).send({ message: 'Your message has been submitted successfully.' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
