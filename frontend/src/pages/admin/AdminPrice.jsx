import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import "../../styles/admin/adminprice.css";

const ITEMS_PER_PAGE = 25;

const AdminPrice = () => {
  const [paddyType, setPaddyType] = useState("");
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/prices");
      setPrices(res.data);
    } catch (err) {
      console.error("Error fetching prices:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { paddy_type: paddyType, price };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/admin/prices/${editingId}`,
          payload
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/admin/prices", payload);
      }

      setPaddyType("");
      setPrice("");
      fetchPrices();
    } catch (err) {
      console.error("Error saving price:", err);
    }
  };

  const handleEdit = (priceEntry) => {
    setPaddyType(priceEntry.paddy_type);
    setPrice(priceEntry.price);
    setEditingId(priceEntry.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/prices/${id}`);
        fetchPrices();
      } catch (err) {
        console.error("Error deleting price:", err);
      }
    }
  };

  // 🔍 Filter prices by paddy type
  const filteredPrices = prices.filter((entry) =>
    entry.paddy_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredPrices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPrices = filteredPrices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="admin-price-container" style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <AdminDashboard />
        <div>
          <h2>Manage Paddy Prices</h2>

          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Paddy Type"
              value={paddyType}
              onChange={(e) => setPaddyType(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <button type="submit">{editingId ? "Update" : "Add"}</button>
          </form>

          {/* 🔍 Search bar */}
          <input
            type="text"
            placeholder="Search by paddy type..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            style={{ marginBottom: "15px", padding: "5px", width: "250px" }}
          />

          <ul>
            {currentPrices.length === 0 ? (
              <p>No matching paddy types found.</p>
            ) : (
              currentPrices.map((entry) => (
                <li key={entry.id} style={{ marginBottom: "20px" }}>
                  <p>
                    <strong>{entry.paddy_type}</strong>: Rs. {entry.price}
                  </p>
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
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
      </div>
    </div>
  );
};

export default AdminPrice;
