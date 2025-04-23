// src/pages/Login.jsx
import React from 'react';
import '../../styles/auth/login.css';

function Login() {
  return (
    <div className="login-container">
      <div class="login-container-blur-layer"></div>
      <div className="login-card">
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <hr />
        <p>Forgot? <a href="/signup">Password?</a></p>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
