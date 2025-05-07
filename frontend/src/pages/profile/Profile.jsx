// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

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
              <button style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
