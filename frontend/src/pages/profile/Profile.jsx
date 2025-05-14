// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/Profile/Profile.css';


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // or use useNavigate if using hooks
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
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

    const fetchGigs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gigs/my-gigs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigs(res.data);
      } catch (err) {
        console.error(
          "Error fetching gigs:",
          err.response?.data || err.message
        );
      }
    };

    const fetchShopItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shop/my-items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShopItems(res.data);
      } catch (err) {
        console.error(
          "Error fetching items:",
          err.response?.data || err.message
        );
      }
    };

    fetchProfile();
    fetchGigs();
    fetchShopItems();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gig?"
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/gigs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGigs((prev) => prev.filter((gig) => gig.id !== id));
      alert("Gig deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete gig.");
    }
  };

  const handleDeleteShopItem = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shop item?"
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/shop/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShopItems((prev) => prev.filter((item) => item.id !== id));
      alert("Shop item deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete shop item.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="full-container">
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
      <br />
      <br />
      <a href="/gig/create">Create Gig</a>
      <br />
      <br />
      <a href="/shop/create">Create Shop Item</a>
      <br />
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
              <p>
                <strong>Paddy Type:</strong> {gig.paddy_type}
              </p>
              <p>
                <strong>Price:</strong> Rs. {gig.price}
              </p>
              <p>
                <strong>Quantity:</strong> {gig.quantity} kg
              </p>
              <p>
                <strong>Description:</strong> {gig.description}
              </p>
              <a href={`/gig/edit/${gig.id}`}>
                <button>Edit</button>
              </a>
              <button
                onClick={() => handleDelete(gig.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <h3>My Shop Items</h3>
      {shopItems.length === 0 ? (
        <p>No shop items found.</p>
      ) : (
        <ul>
          {shopItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "20px" }}>
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt="Shop Item"
                width={100}
              />
              <p>
                <strong>Title:</strong> {item.title}
              </p>
              <p>
                <strong>Price:</strong> Rs. {item.price}
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <a href={`/shop/edit/${item.id}`}>
                <button>Edit</button>
              </a>
              <button
                onClick={() => handleDeleteShopItem(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Profile;