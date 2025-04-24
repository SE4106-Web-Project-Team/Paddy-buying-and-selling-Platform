// src/pages/Signup.jsx
import React from 'react';
import '../../styles/auth/signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-container-blur-layer"></div>

      <div className="signup-card">
        <h2>Create New Account</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <select defaultValue="">
          <option value="" disabled hidden>Select Profile Type</option>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
      </select>
        <button>Sign Up</button>

        <hr />
        <p>Already a user? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;

