// src/pages/About.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import "../styles/about/about.css";

function About() {
  return (
    <div>
      <NavigationBar />
      <p>
        <a href="/">Back</a>
      </p>
      <h2 className="hh">About Page</h2>
      <p>This is the About page for Paddy Platform.</p>
    </div>
  );
}

export default About;
