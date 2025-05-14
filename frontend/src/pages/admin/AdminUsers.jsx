import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      console.log("Fetched users:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>All Users</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name}<br /> ({user.email})
            <button
              onClick={() => handleDelete(user.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
