// src/pages/Gig.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../../styles/gig/gig.css'; // Optional CSS file

const Gig = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gigs');
        setGigs(res.data);
      } catch (err) {
        console.error('Error fetching gigs:', err);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div className="gig-list-container">
      <h2>All Available Gigs</h2>
      <div className="gig-list">
        {gigs.length === 0 ? (
          <p>No gigs available.</p>
        ) : (
          gigs.map((gig) => (
            <div className="gig-card" key={gig.id}>
              <img
                src={`http://localhost:5000/uploads/${gig.image}`}
                alt={gig.paddy_type}
                style={{ width: '100%', maxWidth: 250 }}
              />
              <h3>{gig.paddy_type}</h3>
              <p><strong>Price:</strong> Rs.{gig.price}</p>
              <p><strong>Quantity:</strong> {gig.quantity}kg</p>
              <p><strong>Seller:</strong> {gig.seller_name}</p>
              <p><strong>Province:</strong> {gig.province || 'N/A'}</p>
              <p><strong>Phone:</strong> {gig.phoneNo || 'N/A'}</p>
              <p>{gig.description}</p>
              <button onClick={() => alert('Chat feature coming soon!')}>
                Contact Seller
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gig;
