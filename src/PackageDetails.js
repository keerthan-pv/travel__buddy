import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './PackageDetails.css';

// Import images for the travel packages
import BangaloreCityTourImage from './images/vidhan soudha.jpg';
import NandiHillsImage from './images/bannergatta.webp';
import RamanagaraClimbingImage from './images/ramnagar (1) (1).jpg';
import KabiniSafariImage from './images/kabibi.jpg';

const PackageDetails = () => {
  const { packageId } = useParams();

  // Package data
  const packageDetails = {
    1: {
      name: 'Bangalore City Tour',
      description: 'Explore the best of Bangalore with a guided city tour covering major landmarks.',
      price: 3000,
      perPersonCost: 1000,
      facilities: ['Air-conditioned transport', 'Guide service', 'Lunch'],
      image: BangaloreCityTourImage,
    },
    2: {
      name: 'NANDI HILLS ADVENTURE',
      description: 'Trek up to Nandi Hills for a panoramic view and enjoy a picnic at the top.',
      price: 2000,
      perPersonCost: 500,
      facilities: ['Guided trek', 'Snacks at the top', 'Transport included'],
      image: NandiHillsImage,
    },
    3: {
      name: 'Ramanagara Rock Climbing',
      description: 'Adventure awaits you in Ramanagara with rock climbing and hiking activities.',
      price: 4000,
      perPersonCost: 1200,
      facilities: ['Safety equipment', 'Transport to site', 'Guide service'],
      image: RamanagaraClimbingImage,
    },
    4: {
      name: 'Kabini Wildlife Safari',
      description: 'Embark on an exciting safari through Kabini forest and spot wildlife in their natural habitat.',
      price: 5000,
      perPersonCost: 1500,
      facilities: ['Safari jeep ride', 'Wildlife guide', 'Meals included','Guide service'],
      image: KabiniSafariImage,
    },
  };

  // Memoize pkg to prevent recalculation on every render
  // eslint-disable-next-line
  const pkg = useMemo(() => packageDetails[packageId] || {}, [packageId]);
  const [peopleCount, setPeopleCount] = useState(1);

  // Calculate the total cost based on the number of people
  const totalCost = pkg.price + (pkg.perPersonCost * (peopleCount - 1));

  useEffect(() => {
    if (!pkg.name) {
      // Redirect if the package doesn't exist
      window.location.href = '/'; // Redirect to homepage or an error page
    }
  }, [pkg]);

  return (
    <div className="package-details-container">
      <img src={pkg.image} alt={pkg.name} className="package-image" />
      <h1>{pkg.name}</h1>
      <p>{pkg.description}</p>
      <p><strong>Price per day:</strong> ₹{pkg.price}</p>
      <p><strong>Facilities:</strong> {pkg.facilities.join(', ')}</p>
      
      {/* Number of people selector */}
      <div>
        <label htmlFor="people-count">Number of People:</label>
        <input 
          type="number" 
          id="people-count" 
          value={peopleCount} 
          onChange={(e) => setPeopleCount(e.target.value)} 
          min="1"
        />
      </div>
      
      {/* Total cost calculation */}
      <p><strong>Total Cost for {peopleCount} person(s):</strong> ₹{totalCost}</p>
    </div>
  );
};

export default PackageDetails;
