import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactUs from './ContactUs';
import PopularDestinations from './PopularDestinations';
import PopularEvents from './PopularEvents';
import TravelBuddy from './TravelBuddy'; 
import Profile from './Profile'; // Import the Profile component
import About from './About'; // Import the About component
import './App.css';
import logoImage from './images/logo-modified.png'

function App() {
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle profile display on icon click
  };

  const closeProfile = () => {
    setShowProfile(false); // Close profile when navigating to another route
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo-container">
            <Link to="/about" onClick={closeProfile}> {/* Navigate to About page */}
              <img src={logoImage} alt="Logo" className="header-logo" />
            </Link>
            <div className="logo" onClick={closeProfile}> {/* Navigate to About page */}
              <div>TRAVEL</div>
              <div>BUDDY</div>
            </div>
          </div>
          <nav>
            <Link to="/" onClick={closeProfile}>Home</Link>
            <Link to="/travelbuddy" onClick={closeProfile}>Travel Buddy</Link>
            <Link to="/destinations" onClick={closeProfile}>Popular Destinations</Link>
            <Link to="/travelpackage" onClick={closeProfile}>Travel Package</Link>
            <Link to="/events" onClick={closeProfile}>Popular Events</Link>
            <Link to="/bookatrip" onClick={closeProfile}>Book a Trip</Link>
            <Link to="/contact" onClick={closeProfile}>Contact Us</Link>
          </nav>
          <div className="profile-icon" onClick={toggleProfile}>👤</div>
        </header>
        
        {showProfile && <Profile />} {/* Conditionally render Profile component */}

        <Routes>
          <Route path="/" element={<TravelBuddy />} />
          <Route path="/travelbuddy" element={<TravelBuddy />} />
          <Route path="/about" element={<About />} /> {/* Add route for About page */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/destinations" element={<PopularDestinations />} />
          <Route path="/events" element={<PopularEvents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
