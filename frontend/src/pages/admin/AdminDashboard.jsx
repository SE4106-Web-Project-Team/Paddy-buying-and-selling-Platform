import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/admin/admindashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/admin/blogs')}>Manage Blog Post</button>
      <button onClick={() => navigate('/admin/users')}>Manage Users</button>
      <button onClick={() => navigate('/admin/gigs')}>Manage Gigs</button>
      <button onClick={() => navigate('/admin/shop')}>Manage Shop Items</button>
      <br /><br />
      <button onClick={handleLogout} style={{ background: 'red', color: 'white' }}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
