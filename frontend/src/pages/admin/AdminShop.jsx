import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/adminshop.css";

const AdminShop = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchShopItems = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/shop?page=${pageNum}`
      );
      setItems(res.data.items);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch shop items:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/shop/${id}`);
      fetchShopItems(page); // Refresh after delete
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  useEffect(() => {
    fetchShopItems(page);
  }, [page]);

  const filteredItems = items.filter((item) =>
    item.seller_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  return (
    <div className="admin-container">
      <p>
        <a href="/admin/dashboard">Back</a>
      </p>
      <h2>Manage Shop Items</h2>
      <input
        type="text"
        placeholder="Search by seller name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <strong>{item.item_name}</strong> - {item.description} ({item.price}{" "}
            Rs) <br />
            <i>Seller: {item.seller_name}</i>
            <button
              onClick={() => handleDelete(item.id)}
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
  );
};

export default AdminShop;
