// src/pages/AdminGigs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/admin.css";

const AdminGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGigs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/gigs");
      setGigs(res.data);
    } catch (err) {
      console.error("Failed to fetch gigs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/gigs/${id}`);
      setGigs(gigs.filter((gig) => gig.id !== id));
    } catch (err) {
      console.error("Failed to delete gig:", err);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const filteredGigs = gigs.filter((gig) =>
    gig.seller_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Manage Gigs</h2>
      <input
        type="text"
        placeholder="Search by seller name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredGigs.map((gig) => (
          <li key={gig.id}>
            <strong>{gig.title}</strong> - {gig.description} ({gig.price} Rs) <br />
            <i>Seller: {gig.seller_name}</i>
            <button onClick={() => handleDelete(gig.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGigs;
