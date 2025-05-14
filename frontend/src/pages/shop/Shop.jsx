// src/pages/Shop.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/shop/shop.css";

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  const navigate = useNavigate();

  const handleContactSeller = (sellerId, sellerName) => {
    navigate("/features/chat", {
      state: { sellerId, sellerName },
    });
  };

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shop");
        setShopItems(res.data);
      } catch (err) {
        console.error("Failed to fetch shop items:", err);
      }
    };

    fetchShopItems();
  }, []);

  return (
    <div className="shop-container">
      <h2>Shop Items</h2>
      <div className="shop-grid">
        {shopItems.map((item) => (
          <div key={item.id} className="shop-card">
            {item.image && (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.title}
              />
            )}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>
              <strong>Price:</strong> Rs. {item.price}
            </p>
            <p>
              <strong>Seller:</strong> {item.name}
            </p>

            {/* Contact Seller button */}
            {currentUserId !== item.user_id && (
              <button
                onClick={() => handleContactSeller(item.user_id, item.name)}
              >
                Contact Seller
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
