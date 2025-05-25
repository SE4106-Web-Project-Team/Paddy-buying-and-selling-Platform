// src/pages/About.jsx
import React from "react";
import "../styles/about/about.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";

function About() {
  return (
    <div className="about-page">
      <NavigationBar />
      <div className="about-blur"></div>
      <div className="about-cont">
        <div className="back-button-container">
          <a href="/" className="back-button">Back</a>
        </div>

      <h1>About Page</h1>
      <p>This is the About page for Paddy Platform.</p>
      <p>
        Welcome to our paddy field platform, where tradition meets innovation. Rooted in Sri Lanka's rich agricultural heritage, we aim to empower farmers and connect them with modern tools and markets. Our mission is to enhance sustainable rice cultivation by providing resources, knowledge, and a digital marketplace that benefits every stakeholder in the paddy ecosystem. Join us in cultivating a prosperous future for our farming communities..
      </p>
      </div>
      
    </div>
  );
}

export default About;