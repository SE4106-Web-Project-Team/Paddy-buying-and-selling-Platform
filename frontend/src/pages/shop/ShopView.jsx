import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/shop/shopview.css";

const ShopView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/shop/item/${id}`
        );

        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch shop item:", err);
        setError("Failed to load shop item.");
      }
    };

    fetchItem();
  }, [id]);

  const handleContactSeller = () => {
    if (item && item.user_id !== currentUserId) {
      navigate("/features/chat", {
        state: {
          sellerId: item.user_id,
          sellerName: item.name,
        },
      });
    }
  };

  if (error) return <p>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className="shop-view">
      <p>
        <a href="/shop">Back to Shop</a>
      </p>
      <h2>{item.title}</h2>
      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.title}
        style={{ width: "100%", maxWidth: 400 }}
      />
      <p>
        <strong>Price:</strong> Rs.{item.price}
      </p>
      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <p>
        <strong>Seller:</strong> {item.name}
      </p>
      <p>
        <strong>Phone:</strong> {item.phoneNo}
      </p>
      <p>
        <strong>Province:</strong> {item.province}
      </p>

      {currentUserId !== item.user_id && (
        <button onClick={handleContactSeller}>Contact Seller</button>
      )}
    </div>
  );
};

export default ShopView;
