import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import ContactUs from './ContactUs';
import PopularDestinations from './PopularDestinations';
import PopularEvents from './PopularEvents';
import TravelBuddy from './TravelBuddy';
import Profile from './Profile';
import './App.css';
import logoImage from './images/logo-modified.png';
import TravelPackage from './TravelPackage.js';
import PackageDetails from './PackageDetails.js';
import BookingConfirmation from './BookingConfirmation.js';
import PaymentPage from './PaymentPage.js';
import PaymentConfirmation from './PaymentConfirmation.js';

function App() {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Function to navigate to profile page
  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="header-logo" />
          </Link>
          <div className="logo">
            <div>TRAVEL</div>
            <div>BUDDY</div>
          </div>
        </div>
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/destinations">POPULAR DESTINATIONS</Link>
          <Link to="/travelpackage">TRAVEL PACKAGES</Link>
          <Link to="/events">POPULAR EVENTS</Link>
          <Link to="/bookatrip">BOOK A TRIP</Link>
          <Link to="/contact">CONTACT US</Link>
        </nav>
        <div className="profile-icon" onClick={goToProfile}>👤</div>
      </header>

      <Routes>
        <Route path="/" element={<TravelBuddy />} />
        <Route path="/travelbuddy" element={<TravelBuddy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/destinations" element={<PopularDestinations />} />
        <Route path="/events" element={<PopularEvents />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        <Route path="/travelpackage" element={<TravelPackage />} /> {/* Profile route */}
        <Route path="/packagedetails" element={<PackageDetails/>} /> {/* Profile route */}
        <Route path="/packagedetails/:packageId" element={<PackageDetails/>}/>
        <Route path="/BookingConfirmation" element={<BookingConfirmation/>}/>
        <Route path="/paymentpage" element={<PaymentPage/>}/>
        <Route path="/PaymentConfirmation" element={<PaymentConfirmation/>}/>
        

      </Routes>
    </div>
  );
}

// Wrap your App component with Router in the index.js
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
