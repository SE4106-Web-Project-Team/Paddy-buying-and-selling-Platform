// src/pages/GigEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/gig/gigedit.css";

const GigEdit = () => {
  const { id } = useParams(); // gig ID from URL
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [image, setImage] = useState(null);
  const [paddyType, setPaddyType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/gigs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = res.data;
        setGig(found);
        setPaddyType(found.paddy_type);
        setPrice(found.price);
        setQuantity(found.quantity);
        setDescription(found.description);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        alert("Failed to fetch gig");
        navigate("/profile");
      }
    };

    fetchGig();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("paddyType", paddyType);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.put(`http://localhost:5000/api/gigs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Gig updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed!");
    }
  };

  if (!gig) return <p>Loading gig details...</p>;

  return (
    <div className="gig-edit-container">
      <h2>Edit Gig</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <p>
          <strong>Current Image:</strong>
        </p>
        <img
          src={`http://localhost:5000/uploads/gigs/${gig.image}`}
          alt="Gig"
          style={{ width: 150 }}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input
          type="text"
          value={paddyType}
          onChange={(e) => setPaddyType(e.target.value)}
          placeholder="Paddy Type"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={3}
        ></textarea>
        <button type="submit">Update Gig</button>
        <p>
          <a href="/profile">Cancel</a>
        </p>
      </form>
    </div>
  );
};

export default GigEdit;
