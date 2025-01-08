import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // import useNavigate
import { jsPDF } from 'jspdf';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use the navigate function
  const { orderId, selectedPackage, peopleCount, pickupTime, totalCost, paymentStatus } = location.state || {};

  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text("Payment Confirmation", 20, 20);

    // Add more content with details
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 30); // Corrected the string syntax here
    doc.text(`Package: ${selectedPackage.name}`, 20, 40); // Corrected the string syntax here
    doc.text(`Pickup Time: ${pickupTime}`, 20, 50); // Corrected the string syntax here
    doc.text(`Number of People: ${peopleCount}`, 20, 60); // Corrected the string syntax here
    doc.text(`Total Cost: ₹${totalCost}`, 20, 70); // Corrected the string syntax here
    doc.text(`Payment Status: ${paymentStatus}`, 20, 80); // Corrected the string syntax here

    // Save the PDF (this will trigger the download)
    doc.save('payment_confirmation.pdf');
  };

  const handleGoHome = () => {
    // Redirect to the homepage using the navigate function from React Router
    navigate('/'); // this will redirect to the root (home) route
  };

  return (
    <div className="payment-confirmation">
      <h1>Payment Confirmation</h1>
      <div className="confirmation-details">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Package:</strong> {selectedPackage.name}</p>
        <p><strong>Pickup Time:</strong> {pickupTime}</p>
        <p><strong>Number of People:</strong> {peopleCount}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        <p><strong>Payment Status:</strong> {paymentStatus}</p>
      </div>

      <div className="confirmation-actions">
        <button onClick={handlePrintPDF}>Print PDF</button>
        <button onClick={handleGoHome}>Go to Homepage</button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
