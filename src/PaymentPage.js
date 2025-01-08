/* import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPackage, peopleCount, pickupTime, totalCost } = location.state || {};

  if (!selectedPackage) {
   
    navigate('/');
    return null;
  }

  const handlePayNow = () => {
   
    window.location.href = `https://mockpaymentgateway.com/pay?amount=${totalCost}`;
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Page</h1>
        <div className="payment-details">
          <h3>Package Details:</h3>
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Pickup Time:</strong> {pickupTime}</p>
          <p><strong>Number of People:</strong> {peopleCount}</p>
          <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>

        <div className="payment-actions">
          <button onClick={handlePayNow}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPackage, peopleCount, pickupTime, totalCost } = location.state || {};

  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Flag to track loading state
  const [paymentStatus, setPaymentStatus] = useState(''); // Track payment status

  // If no selectedPackage is available, redirect to home
  if (!selectedPackage) {
    navigate('/');
    return null;
  }

  // Function to create the mock order
  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalCost, // Amount in INR
          packageName: selectedPackage.name,
        }),
      });
      const data = await response.json();
      if (data.orderId) {
        setOrderId(data.orderId); // Set the mock order ID returned by the backend
      } else {
        console.error('Failed to create order:', data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // Simulate the payment process
  const handlePayNow = async () => {
    if (!orderId) {
      // First, create the order if it doesn't exist
      setIsLoading(true); // Set loading state while creating order
      await createOrder(); // Wait for order creation
      setIsLoading(false); // End loading state after order creation
    }

    // If order creation was successful and orderId is set
    if (orderId) {
      // Simulate a random payment status (success or failure)
      const isPaymentSuccessful = Math.random() > 1; // 50% chance of success
      const paymentStatus = isPaymentSuccessful ? 'success' : 'failed';

      // Call backend to verify the payment status
      const response = await fetch('http://localhost:5000/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          paymentStatus,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setPaymentStatus('Payment successful!');
        alert('Payment was successful!');
        
        // Redirect to PaymentConfirmation page with all the details
        navigate('/paymentconfirmation', {
          state: {
            selectedPackage,
            peopleCount,
            pickupTime,
            totalCost,
            orderId,
            paymentStatus: 'Payment successful!',
          }
        });
      } else {
        setPaymentStatus('Payment failed. Please try again.');
        alert('Payment failed. Please try again!');
      }
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Page</h1>
        <div className="payment-details">
          <h3>Package Details:</h3>
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Pickup Time:</strong> {pickupTime}</p>
          <p><strong>Number of People:</strong> {peopleCount}</p>
          <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>

        <div className="payment-actions">
          {isLoading ? (
            <p>Loading order...</p>
          ) : (
            <button onClick={handlePayNow}>Pay Now</button>
          )}
        </div>

        {/* Optionally show payment status message */}
        {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
      </div>
    </div>
  );
};

export default PaymentPage;

