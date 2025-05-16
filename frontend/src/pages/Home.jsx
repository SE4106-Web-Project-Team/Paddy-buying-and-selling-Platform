// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import "../styles/home/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />

        <div className="hero">
          <Link to="/login">become a Seller/Buyer</Link> <br />
          <Link to="/about">Why Us?</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
