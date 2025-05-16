// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  //For Dropdown
  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    const url = e.target.value;
    if (url) {
      window.location.href = url; // Redirects to the selected link
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h1>PADDY PLATFORM</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
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
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>

        <div className="hero">
          <Link to="/login">become a Seller/Buyer</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
