// src/pages/GigCreate.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GigCreate = () => {
  const [formData, setFormData] = useState({
    paddyType: "",
    price: "",
    description: "",
    quantity: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/gigs/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Gig created successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Error creating gig:", err.response?.data || err.message);
      alert("Failed to create gig.");
    }
  };

  return (
    <div className="gig-create-container">
      <h2>Create a Gig</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" onChange={handleChange} required />
        <input type="text" name="paddyType" placeholder="Paddy Type" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity (kg)" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <button type="submit">Create Gig</button>
        <p>
          <a href="/profile">Cancel</a>
        </p>
      </form>
    </div>
  );
};

export default GigCreate;
