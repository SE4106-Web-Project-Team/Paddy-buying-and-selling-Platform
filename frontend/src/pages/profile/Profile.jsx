// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchProfile();
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

      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Profile Type:</strong> {user.profileType}
      </p>
      <p>
        <strong>Phone Number:</strong> {user.phoneNo || "N/A"}
      </p>
      <p>
        <strong>Province:</strong> {user.province || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {user.description || "N/A"}
      </p>
      <a href="/profile/edit">Edit Profile</a>
    </div>
  );
};

export default Profile;
