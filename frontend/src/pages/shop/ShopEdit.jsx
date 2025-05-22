// src/pages/ShopEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/shop/shopedit.css";

const ShopEdit = () => {
  const { id } = useParams(); // shop item ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchShopItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/shop/item/${id}`
        );
        const { title, description, price, image } = res.data;
        setFormData({ title, description, price, image: null });
        if (image) {
          setPreview(`http://localhost:5000/uploads/shop/${image}`);
        }

      } catch (err) {
        console.error("Error fetching shop item", err);
      }
    };

    fetchShopItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("price", formData.price);
      if (formData.image) {
        form.append("image", formData.image);
      } else {
        form.append("existingImage", preview.split("/").pop());
      }

      await axios.put(`http://localhost:5000/api/shop/update/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Shop item updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Failed to update shop item", err);
    }
  };

  return (
  <>
    <div className="shop-edit-background"></div>
    <div className="shop-edit-container">
      <h2>Edit Shop Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {preview && (
          <div>
            <p>Image Preview:</p>
            <img src={preview} alt="preview" className="preview-img" />
          </div>
        )}
        <button classname="shop-edit-button" type="submit">Update</button>
        <p>
          <a href="/profile" classname="cancel-link">Cancel</a>
        </p>
      </form>
    </div>
  </>

  );
};

export default ShopEdit;
