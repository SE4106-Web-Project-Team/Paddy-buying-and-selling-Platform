// src/pages/GigCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GigCreate = () => {
  const [formData, setFormData] = useState({
    paddyType: '',
    price: '',
    description: '',
    quantity: '',
    image: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append('paddyType', formData.paddyType);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('quantity', formData.quantity);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:5000/api/gigs/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Gig created successfully!');
      navigate('/profile'); // Redirect back to profile after success
    } catch (err) {
      console.error('Create gig error:', err.response?.data || err.message);
      alert('Failed to create gig');
    }
  };

  return (
    <div className="gig-create-container">
      <h2>Create New Gig</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Paddy Type:</label>
          <input type="text" name="paddyType" value={formData.paddyType} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity (KG):</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" />
        </div>
        <button type="submit">Create Gig</button>
      </form>
    </div>
  );
};

export default GigCreate;
