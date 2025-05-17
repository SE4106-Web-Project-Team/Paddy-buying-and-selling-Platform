import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // 🔍 Filtered prices based on search query
  const filteredPrices = prices.filter((item) =>
    item.paddy_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📄 Pagination logic
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
    <div style={{ padding: "20px" }}>
      <p>
        <a href="/">Back</a>
      </p>
      <h2>Current Paddy Prices</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search paddy type..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        style={{
          marginBottom: "15px",
          padding: "5px",
          width: "250px",
          fontSize: "14px",
        }}
      />

      {/* Price List */}
      <ul>
        {currentPrices.length === 0 ? (
          <p>No results found.</p>
        ) : (
          currentPrices.map((item) => (
            <li key={item.id}>
              <strong>{item.paddy_type}</strong>: Rs. {item.price}
            </li>
          ))
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px" }}>
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
  );
};

export default PaddyPrice;
