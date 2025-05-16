// src/pages/AdminShop.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/admin.css";

const AdminShop = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchShopItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/shop");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch shop items:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/shop/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  useEffect(() => {
    fetchShopItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.seller_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Manage Shop Items</h2>
      <input
        type="text"
        placeholder="Search by seller name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <strong>{item.item_name}</strong> - {item.description} ({item.price} Rs) <br />
            <i>Seller: {item.seller_name}</i>
            <button onClick={() => handleDelete(item.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminShop;
