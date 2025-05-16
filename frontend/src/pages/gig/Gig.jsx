import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../components/nav/NavigationBar";
import "./../../styles/gig/gig.css";

const Gig = () => {
  const [gigs, setGigs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gigsPerPage = 40;

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  const handleContactSeller = (sellerId, sellerName) => {
    navigate("/features/chat", {
      state: { sellerId, sellerName },
    });
  };

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gigs");
        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs:", err);
      }
    };

    fetchGigs();
  }, []);

  // Pagination logic
  const indexOfLastGig = currentPage * gigsPerPage;
  const indexOfFirstGig = indexOfLastGig - gigsPerPage;
  const currentGigs = gigs.slice(indexOfFirstGig, indexOfLastGig);

  const totalPages = Math.ceil(gigs.length / gigsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="gig-page-wrapper">
      <div className="gig-background-blur"></div>
      <div className="gig-list-container">
      <NavigationBar />
        <p>
          <a href="/">Back</a>
        </p>
        <h2>All Available Gigs</h2>

        <div className="gig-list">
          {currentGigs.length === 0 ? (
            <p>No gigs available.</p>
          ) : (
            currentGigs.map((gig) => (
              <div className="gig-card" key={gig.id}>
                <img
                  src={`http://localhost:5000/uploads/${gig.image}`}
                  alt={gig.paddy_type}
                  style={{ width: "100%", maxWidth: 250 }}
                />
                <h3>{gig.paddy_type}</h3>
                <p>
                  <strong>Price:</strong> Rs.{gig.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {gig.quantity}kg
                </p>
                <p>
                  <strong>Seller:</strong> {gig.seller_name}
                </p>

                {currentUserId !== gig.user_id && (
                  <button
                    onClick={() =>
                      handleContactSeller(gig.user_id, gig.seller_name)
                    }
                  >
                    Contact Seller
                  </button>
                )}

                <button
                  onClick={() => navigate(`/gig/${gig.id}`)}
                  style={{ margin: "10px" }}
                >
                  Read More
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div
          className="pagination-controls"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gig;
