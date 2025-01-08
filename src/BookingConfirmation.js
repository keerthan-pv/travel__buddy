import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPackage, peopleCount, pickupTime, totalCost } = location.state || {};

  const handleEdit = () => {
    navigate('/travelpackage'); // Navigate back to TravelPackage page
  };

  const handleProceedToPayment = () => {
    navigate('/paymentpage', {
      state: { selectedPackage, peopleCount, pickupTime, totalCost },
    });
  };

  return (
    <div className="confirmation-container">
      <h1>Booking Confirmation</h1>

      {selectedPackage && (
        <div className="confirmation-details">
          <h2>{selectedPackage.name}</h2>
          <p>{selectedPackage.description}</p>
          <p><strong>Pickup Time:</strong> {pickupTime}</p>
          <p><strong>Number of People:</strong> {peopleCount}</p>
          <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>
      )}

      <div className="confirmation-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
