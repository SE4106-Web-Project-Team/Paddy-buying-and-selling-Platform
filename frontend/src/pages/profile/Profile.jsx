// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Profile/Profile.css";

const ITEMS_PER_PAGE = 6;

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [shopItems, setShopItems] = useState([]);

  const [gigSearchTerm, setGigSearchTerm] = useState("");
  const [shopSearchTerm, setShopSearchTerm] = useState("");

  // Add pagination states
  const [gigPage, setGigPage] = useState(1);
  const [shopPage, setShopPage] = useState(1);

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

  const filteredGigs = gigs.filter((gig) =>
    gig.paddy_type.toLowerCase().includes(gigSearchTerm.toLowerCase())
  );

  const filteredShopItems = shopItems.filter((item) =>
    item.title.toLowerCase().includes(shopSearchTerm.toLowerCase())
  );

  // Then apply pagination
  const paginatedGigs = filteredGigs.slice(
    (gigPage - 1) * ITEMS_PER_PAGE,
    gigPage * ITEMS_PER_PAGE
  );

  const paginatedShopItems = filteredShopItems.slice(
    (shopPage - 1) * ITEMS_PER_PAGE,
    shopPage * ITEMS_PER_PAGE
  );

  // Handle deletions
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gig?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/gigs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGigs((prev) => prev.filter((gig) => gig.id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const handleDeleteShopItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop item?"))
      return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/shop/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShopItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="full-container">
      <div className="profile-container">
        <h2>My Profile</h2>
        {user.profilePicture && (
          <img
            src={`http://localhost:5000/uploads/profile/${user.profilePicture}`}
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
        <p>
          <a href="/">Back</a>
        </p>

        <hr />
        <h3>My Gigs</h3>
        {gigs.length === 0 ? (
          <p>No gigs found.</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search gigs by paddy type..."
              value={gigSearchTerm}
              onChange={(e) => {
                setGigSearchTerm(e.target.value);
                setGigPage(1); // Reset to first page on new search
              }}
              
            />
            <ul>
              {paginatedGigs.map((gig) => (
                <li key={gig.id} style={{ marginBottom: "20px" }}>
                  <img
                    src={`http://localhost:5000/uploads/gigs/${gig.image}`}
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
            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => setGigPage((p) => Math.max(p - 1, 1))}
                disabled={gigPage === 1}
              >
                Previous
              </button>
              <span> Page {gigPage} </span>
              <button
                onClick={() =>
                  setGigPage((p) =>
                    p * ITEMS_PER_PAGE < gigs.length ? p + 1 : p
                  )
                }
                disabled={gigPage * ITEMS_PER_PAGE >= filteredGigs.length}
              >
                Next
              </button>
            </div>
          </>
        )}

        <hr />
        <h3>My Shop Items</h3>
        {shopItems.length === 0 ? (
          <p>No shop items found.</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search shop items by title..."
              value={shopSearchTerm}
              onChange={(e) => {
                setShopSearchTerm(e.target.value);
                setShopPage(1); // Reset to first page on new search
              }}
              
            />

            <ul>
              {paginatedShopItems.map((item) => (
                <li key={item.id} style={{ marginBottom: "20px" }}>
                  <img
                    src={`http://localhost:5000/uploads/shop/${item.image}`}
                    alt="Shop Item"
                    width={100}
                  />
                  <p>
                    <strong>Title:</strong> {item.title}
                  </p>
                  <p>
                    <strong>Price:</strong> Rs. {item.price}
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
            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => setShopPage((p) => Math.max(p - 1, 1))}
                disabled={shopPage === 1}
              >
                Previous
              </button>
              <span> Page {shopPage} </span>
              <button
                onClick={() =>
                  setShopPage((p) =>
                    p * ITEMS_PER_PAGE < shopItems.length ? p + 1 : p
                  )
                }
                disabled={shopPage * ITEMS_PER_PAGE >= filteredShopItems.length}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
