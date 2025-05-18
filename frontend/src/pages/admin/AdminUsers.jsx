import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import "../../styles/admin/adminusers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/users?page=${pageNum}`
      );
      setUsers(res.data.users);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      fetchUsers(page);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filteredUsers = users.filter((user) =>
    (user.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const goToPage = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <AdminDashboard />
        <div>
          <h2>All Users</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                {user.name}
                <br /> ({user.email})
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ marginLeft: "10px" }}
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
      </div>
    </div>
  );
};

export default AdminUsers;
