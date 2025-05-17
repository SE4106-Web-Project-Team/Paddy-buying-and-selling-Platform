import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/gig/gigview.css";

const GigView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:5000/api/gigs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGig(res.data);
      } catch (err) {
        console.error("Failed to fetch gig:", err);
        setError("Failed to load gig.");
      }
    };

    fetchGig();
  }, [id]);

  const handleContactSeller = () => {
    if (gig && gig.user_id !== currentUserId) {
      navigate("/features/chat", {
        state: {
          sellerId: gig.user_id,
          sellerName: gig.seller_name,
        },
      });
    }
  };

  if (error) return <p>{error}</p>;
  if (!gig) return <p>Loading...</p>;

  return (
    <div className="gig-view">
      <p>
        <a href="/gigs">Back to Gigs</a>
      </p>
      <h2>{gig.paddy_type}</h2>
      <img
        src={`http://localhost:5000/uploads/gigs/${gig.image}`}
        alt={gig.paddy_type}
        style={{ width: "100%", maxWidth: 400 }}
      />
      <p>
        <strong>Price:</strong> Rs.{gig.price}
      </p>
      <p>
        <strong>Quantity:</strong> {gig.quantity}kg
      </p>
      <p>
        <strong>Seller:</strong> {gig.seller_name}
      </p>
      <p>
        <strong>Province:</strong> {gig.province}
      </p>
      <p>
        <strong>Description:</strong> {gig.description}
      </p>

      {/* Show Contact Seller only if current user is not the seller */}
      {currentUserId !== gig.user_id && (
        <button onClick={handleContactSeller}>Contact Seller</button>
      )}
    </div>
  );
};

export default GigView;
