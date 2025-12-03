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

        

        
      </div>
    </div>
  );
}

export default About;