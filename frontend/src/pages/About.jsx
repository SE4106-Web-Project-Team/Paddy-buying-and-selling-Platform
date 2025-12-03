// src/pages/About.jsx
import React from "react";
import "../styles/about/about.css";
import { Link } from "react-router-dom"; // Removed unused useNavigate
import NavigationBar from "../components/nav/NavigationBar";

function About() {
  return (
    <div className="about-page">
      <NavigationBar />
      
      {/* Section 1: Hero Header */}
      <div className="about-hero">
        <div className="hero-overlay">
          <div className="fade-in-up">
            <h1>Cultivating the Future</h1>
            <p className="subtitle">Where Sri Lankan Tradition Meets Modern Innovation</p>
          </div>
        </div>
      </div>

      {/* Section 2: Main Content */}
      <div className="about-content-wrapper">
        <div className="back-button-container">
            {/* Switched to Link for faster internal routing, kept styling */}
            <Link to="/" className="back-button">← Back Home</Link>
        </div>

        <section className="mission-section fade-in-up delay-1">
          <div className="mission-text">
            <h2>Our Story</h2>
            <p>
              Welcome to <strong>Paddy Smart</strong>. Rooted deeply in Sri Lanka's rich agricultural heritage, 
              we recognized a gap between the hardworking farmers who feed our nation and the modern markets they deserve access to.
            </p>
            <p>
              Our mission is to bridge this gap. We empower farmers by connecting them with 
              modern tools, real-time market data, and a transparent digital marketplace. 
              We believe that when a farmer thrives, the entire nation prospers.
            </p>
          </div>
          <div className="mission-image-placeholder">
            {/* You can place a secondary image here, or an icon */}
            <div className="leaf-icon">🌿</div>
          </div>
        </section>

      {/* Section 3: Interactive Cards */}
        <section className="values-grid">
          <div className="value-card fade-in-up delay-2">
            <div className="icon">🌾</div>
            <h3>Sustainable</h3>
            <p>Promoting eco-friendly rice cultivation methods that protect our soil for future generations.</p>
          </div>

          <div className="value-card fade-in-up delay-3">
            <div className="icon">🤝</div>
            <h3>Transparent</h3>
            <p>A fair marketplace where prices are clear, ensuring farmers get the value they deserve.</p>
          </div>

          <div className="value-card fade-in-up delay-4">
            <div className="icon">🚀</div>
            <h3>Innovative</h3>
            <p>Bringing cutting-edge technology to the paddy fields to streamline buying and selling.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;