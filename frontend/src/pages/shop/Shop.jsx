import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/nav/NavigationBar";
import "../../styles/shop/shop.css";

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

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

  // Filter based on search term
  const filteredItems = shopItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
    <div className="shop-container">
      <NavigationBar />
      <p>
        <a href="/">Back</a>
      </p>
      <h2>Shop Items</h2>

      {/* Search Input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div className="shop-grid">
        {currentItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items found.</p>
        ) : (
          currentItems.map((item) => (
            <div key={item.id} className="shop-card">
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.title}
                />
              )}
              <h3>{item.title}</h3>
              <p>
                <strong>Price:</strong> Rs. {item.price}
              </p>
              <p>
                <strong>Seller:</strong> {item.name}
              </p>

              <button onClick={() => navigate(`/shop/${item.id}`)}>
                Read More
              </button>

              {currentUserId !== item.user_id && (
                <button
                  onClick={() => handleContactSeller(item.user_id, item.name)}
                >
                  Contact Seller
                </button>
              )}
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
  );
};

export default Shop;
