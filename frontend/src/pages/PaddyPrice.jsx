import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import "../styles/price/paddyprice.css";

const ITEMS_PER_PAGE = 25;

const PaddyPrice = () => {
  const [prices, setPrices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/prices")
      .then((res) => setPrices(res.data))
      .catch((err) => console.error("Failed to load prices:", err));
  }, []);

  // Filtered prices based on search query
  const filteredPrices = prices.filter((item) =>
    item.paddy_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPrices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPrices = filteredPrices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="paddy-price-wrapper">
      <div className="paddy-price-background"></div>
      <NavigationBar />
      <div className="paddy-price-container">
        <a href="/" className="paddy-back-link">Back</a>
      
      <h2 >Current Paddy Prices</h2>

      <input
        type="text"
        placeholder="Search paddy type..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
         className="paddy-search-input"
      />
      
      <ul className="paddy-list">
        {currentPrices.length === 0 ? (
          <p className="paddy-no-results">No results found.</p>
        ) : (
          currentPrices.map((item) => (
            <li key={item.id} className="paddy-item">
              <strong>{item.paddy_type}</strong>: Rs. {item.price}
            </li>
          ))
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="paddy-pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>{" "}
          Page {currentPage} of {totalPages}{" "}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      </div>
        
    </div>
  );
};

export default PaddyPrice;
