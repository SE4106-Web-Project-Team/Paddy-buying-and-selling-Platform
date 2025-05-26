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
    <>
      <a href="/gigs" className="gig-back-link">Back to Gigs</a>
    <div className="gig-view">
        <div className="back-blur">

          <h2 className="gig-title">{gig.paddy_type}</h2>
          <img
            src={`http://localhost:5000/uploads/gigs/${gig.image}`}
            alt={gig.paddy_type}
            className="gig-image" />
          <p className="gig-info">
            <strong>Price:</strong> Rs.{gig.price}
          </p>
          <p className="gig-info">
            <strong>Quantity:</strong> {gig.quantity}kg
          </p>
          <p className="gig-info">
            <strong>Seller:</strong> {gig.seller_name}
          </p>
          <p className="gig-info">
            <strong>Province:</strong> {gig.province}
          </p>
          <p className="gig-info">
            <strong>Description:</strong> {gig.description}
          </p>

          {currentUserId !== gig.user_id && (
            <button className="gig-contact-button" onClick={handleContactSeller}>Contact Seller</button>
          )}
        </div>

      </div></>
  );
};

export default GigView;
