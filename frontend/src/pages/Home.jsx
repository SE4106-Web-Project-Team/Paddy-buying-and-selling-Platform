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
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <h1 className="hero-title">Connect & Trade Paddy with Ease</h1>
            <hr className="section-divider" />
            <p className="hero-description">
              Join our platform to buy or sell high-quality paddy directly with
              farmers and buyers. Fast, secure, and transparent transactions for
              all.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="hero-button primary-button">
                Become a Seller/Buyer
              </Link>
              <Link to="/about" className="hero-button secondary-button">
                Why Us?
              </Link>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default Home;
