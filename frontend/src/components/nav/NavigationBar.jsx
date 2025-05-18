// src/components/NavigationBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home/navBar.css";

function NavigationBar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleChange = (e) => {
    const url = e.target.value;
    if (url) {
      navigate(url);
    }
  };

  return (
    <nav>
      <h1>PADDY PLATFORM</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          <select value={selected} onChange={handleChange}>
            <option value="">Features</option>
            <option value="/features/weather">Weather</option>
            <option value="/features/chat">Chat</option>
            <option value="/features/chatbot">Chatbot</option>
          </select>
        </li>
        <li><Link to="/gigs">Gigs</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/paddyprice">Paddy Prices</Link></li>

        <li>
          {isLoggedIn ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
