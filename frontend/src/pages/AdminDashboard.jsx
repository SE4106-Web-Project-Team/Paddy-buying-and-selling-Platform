import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/admin/admindashboard.css";

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Check if we are on the root dashboard path
  const isRootDashboard = location.pathname === "/admin/dashboard";

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2><a href="/admin/dashboard">Admin Dashboard</a></h2>
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/gigs")}>Manage Gigs</button>
        <button onClick={() => navigate("/admin/shop")}>
          Manage Shop Items
        </button>
        <button onClick={() => navigate("/admin/blogs")}>
          Manage Blog Posts
        </button>
        <button onClick={() => navigate("/admin/price")}>Manage Prices</button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        {isRootDashboard && !children ? (
          <div className="welcome-panel">
            <h1>👋 Welcome, Admin!</h1><br />
            <p>
              Use the sidebar to manage users, gigs, shop items, blog posts, and
              prices.
            </p>
            <p>Have a great day! 🚀</p>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
