
// src/pages/About.jsx
import React from "react";
import "../styles/about/about.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import aboutImage from "../resources/images/about/image-about.jpg";

function About() {
  return (
    <div>
      <NavigationBar />
      <p>
        <a href="/" className="back-button">
          Back
        </a>
      </p>
      <div
        className="about-image"
        style={{ backgroundImage: `url(${aboutImage})` }}
      >
        <div className="about-container">
          <h1>About Page</h1>
          <p>This is the About page for Paddy Platform.</p>
          <p>
            Welcome to our paddy field platform, where tradition meets
            innovation. Rooted in Sri Lanka's rich agricultural heritage, we aim
            to empower farmers and connect them with modern tools and markets.
            Our mission is to enhance sustainable rice cultivation by providing
            resources, knowledge, and a digital marketplace that benefits every
            stakeholder in the paddy ecosystem. Join us in cultivating a
            prosperous future for our farming communities..
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
