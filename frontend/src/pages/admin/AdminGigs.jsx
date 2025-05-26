import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import "../../styles/admin/admingigs.css";

const AdminGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGigs = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/gigs?page=${pageNum}`
      );
      setGigs(res.data.gigs);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch gigs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/gigs/${id}`);
      fetchGigs(page);
    } catch (err) {
      console.error("Failed to delete gig:", err);
    }
  };

  useEffect(() => {
    fetchGigs(page);
  }, [page]);

  const filteredGigs = gigs.filter((gig) =>
    gig.seller_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  return (
    <div className="admin-gigs-page">
      <AdminDashboard>
        <div className="content-panel">
          <h2>Manage Gigs</h2>

          <input
            type="text"
            placeholder="Search by seller name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <ul>
            {filteredGigs.map((gig) => (
              <li key={gig.id}>
                <strong>{gig.paddy_type}</strong> - {gig.description} (Rs. {gig.price}{" "})
                <i>Seller: {gig.seller_name}</i>
                <button
                  onClick={() => handleDelete(gig.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </AdminDashboard>
    </div>
  );
};

export default AdminGigs;
