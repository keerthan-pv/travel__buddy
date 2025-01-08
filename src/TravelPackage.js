import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelPackage.css';

import BangaloreCityTourImage from './images/vidhan soudha.jpg';
import NandiHillsImage from './images/nandi hills.jpg';
import RamanagaraClimbingImage from './images/ramnagar (1) (1).jpg';
import KabiniSafariImage from './images/kabibi.jpg';

const TravelPackage = () => {
  const navigate = useNavigate();
  const [peopleCount, setPeopleCount] = useState(1);
  const [pickupTime, setPickupTime] = useState('8am');
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const packages = [
    {
      id: 1,
      name: 'BANGLORE CITY TOUR',
      description: 'Explore the best of Bangalore with a guided city tour covering major landmarks.',
      image: BangaloreCityTourImage,
      price: 3000,
    },
    {
      id: 2,
      name: 'NANDI HILLS ADVENTURE',
      description: 'Trekking up to Nandi Hills for a panoramic view and enjoy a picnic at the top.',
      image: NandiHillsImage,
      price: 2000,
    },
    {
      id: 3,
      name: 'RAMNAGAR ROCK CLIMBING',
      description: 'Adventure awaits you in Ramanagara with rock climbing and hiking activities.',
      image: RamanagaraClimbingImage,
      price: 4000,
    },
    {
      id: 4,
      name: 'KABINI SAFARI',
      description: 'Embark on an exciting safari through Kabini forest and spot wildlife in their natural habitat.',
      image: KabiniSafariImage,
      price: 5000,
    },
  ];

  const handlePackageDetails = (packageId) => {
    navigate(`/packagedetails/${packageId}`);
  };

  const handlePackageSelection = (event) => {
    setSelectedPackageId(event.target.value);
  };

  const totalCost = selectedPackageId
    ? packages.find(pkg => pkg.id === parseInt(selectedPackageId)).price * peopleCount
    : 0;

  const handleBookNow = () => {
    if (!selectedPackageId) {
      alert('Please select a package first.');
      return;
    }

    const selectedPackage = packages.find(pkg => pkg.id === parseInt(selectedPackageId));
    navigate('/bookingconfirmation', {
      state: {
        selectedPackage,
        peopleCount,
        pickupTime,
        totalCost,
      },
    });
  };

  return (
    <div className="travel-package-container">
      <h1>TRAVEL PACKAGES</h1>

      {/* Package Cards */}
      <div className="package-scroll">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.name} className="package-image" />
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <button onClick={() => handlePackageDetails(pkg.id)}>Package Details</button>
          </div>
        ))}
      </div>

      {/* Package Selection Form */}
      <div className="package-selection-form">
        <h2>Select Your Package</h2>

        <div className="dropdown-container">
          <label htmlFor="package-select">Choose a Package:</label>
          <select
            id="package-select"
            value={selectedPackageId || ''}
            onChange={handlePackageSelection}
          >
            <option value="">-- Select a Package --</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Time of Pickup */}
        <div className="dropdown-container">
          <label htmlFor="pickup-time">Time of Pickup:</label>
          <select
            id="pickup-time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          >
            <option value="8am">8:00 AM</option>
            <option value="10am">10:00 AM</option>
            <option value="12pm">12:00 PM</option>
            <option value="2pm">2:00 PM</option>
          </select>
        </div>

        {/* Number of People */}
        <div className="dropdown-container">
          <label htmlFor="people-count">Number of People:</label>
          <input
            type="number"
            id="people-count"
            min="1"
            max="20"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
            step="1"
          />
          <span>{peopleCount} person(s)</span>
        </div>

        {/* Total Cost */}
        {selectedPackageId && (
          <div className="total-cost">
            Total Cost: ₹{totalCost}
          </div>
        )}

        {/* Book Now Button */}
        <div className="book-now-container">
          <button onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default TravelPackage;
