// /src/pages/ShopCreate.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/shop/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Shop item created!");
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      navigate("/profile");
    } catch (err) {
      console.error("Error creating shop item:", err.response?.data || err);
      alert("Failed to create shop item.");
    }
  };

  return (
    <div className="shop-create">
      <h2>Create Shop Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Create</button>
        <p>
          <a href="/profile">Cancel</a>
        </p>
      </form>
    </div>
  );
};

export default ShopCreate;
