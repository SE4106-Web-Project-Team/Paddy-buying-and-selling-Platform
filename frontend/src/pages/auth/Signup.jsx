import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/signup.css";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // State for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileType, setProfileType] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword || !profileType) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        profileType,
      });

      alert("Signup Successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup error:", error.response.data.message);
      alert("Signup Failed: " + error.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-container-blur-layer"></div>

      <div className="signup-card">
        <h2>Create New Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <select
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
        >
          <option value="" disabled hidden>
            Select Profile Type
          </option>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>

        <button onClick={handleSignup}>Sign Up</button>

        <hr />
        <p>
          Already a user? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
