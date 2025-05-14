// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/profile.css";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // or use useNavigate if using hooks
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    const fetchGigs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gigs/my-gigs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs:", err.response?.data || err.message);
      }
    };

    fetchProfile();
    fetchGigs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this gig?");
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/gigs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh the gig list
      setGigs(prev => prev.filter(gig => gig.id !== id));
      alert("Gig deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete gig.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {user.profilePicture && (
        <img
          src={`http://localhost:5000/uploads/${user.profilePicture}`}
          alt="Profile"
          style={{ width: 150, borderRadius: "50%" }}
        />
      )}

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Profile Type:</strong> {user.profileType}</p>
      <p><strong>Phone Number:</strong> {user.phoneNo || "N/A"}</p>
      <p><strong>Province:</strong> {user.province || "N/A"}</p>
      <p><strong>Description:</strong> {user.description || "N/A"}</p>

      <a href="/profile/edit">Edit Profile</a>
      <br />
      <a href="/gig/create">Create Gig</a>
      <br />
      <button onClick={handleLogout}>Logout</button>

      <hr />
      <h3>My Gigs</h3>
      {gigs.length === 0 ? (
        <p>No gigs found.</p>
      ) : (
        <ul>
          {gigs.map((gig) => (
            <li key={gig.id} style={{ marginBottom: "20px" }}>
              <img
                src={`http://localhost:5000/uploads/${gig.image}`}
                alt="Gig"
                width={100}
              />
              <p><strong>Paddy Type:</strong> {gig.paddy_type}</p>
              <p><strong>Price:</strong> Rs. {gig.price}</p>
              <p><strong>Quantity:</strong> {gig.quantity} kg</p>
              <p><strong>Description:</strong> {gig.description}</p>
              <a href={`/gig/edit/${gig.id}`}>
                <button>Edit</button>
              </a>
              <button onClick={() => handleDelete(gig.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
/*
// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/profile.css";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    const fetchGigs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gigs/my-gigs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs:", err.response?.data || err.message);
      }
    };

    fetchProfile();
    fetchGigs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this gig?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/gigs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGigs(prev => prev.filter(gig => gig.id !== id));
      alert("Gig deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete gig.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="left-column">
        {user.profilePicture && (
          <img
            src={`http://localhost:5000/uploads/${user.profilePicture}`}
            alt="Profile"
            className="profile-image"
          />
        )}
        <div className="star-rating">★★★★☆</div>
        <h3>{user.name}</h3>
        <p className="profile-type">{user.profileType}</p>
        <textarea
          className="description-box"
          value={user.description || "N/A"}
          readOnly
        />
        <p><strong>Province:</strong> {user.province || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phoneNo || "N/A"}</p>
      </div>

      <div className="right-column">
        <div className="top-buttons">
          <button>Create a Gig</button>
          <button>Create a Item</button>
        </div>

        <div className="search-sort">
          <input type="text" placeholder="Search bar" />
          <button>Sort by</button>
        </div>

        <div className="gig-list">
          {gigs.length === 0 ? (
            <p>No gigs found.</p>
          ) : (
            gigs.map((gig) => (
              <div className="gig-card" key={gig.id}>
                <img
                  src={`http://localhost:5000/uploads/${gig.image}`}
                  alt="Gig"
                  className="gig-image"
                />
                <p><strong>Price:</strong> Rs. {Number(gig.price).toFixed(2)}</p>
                <p className="gig-type">{gig.paddy_type}</p>
                <button>Contact</button>
                <a href={`/gig/edit/${gig.id}`}>
                  <button>Edit</button>
                </a>
                <button onClick={() => handleDelete(gig.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
*/