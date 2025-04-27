// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/login.css';
import axios from 'axios'; // install axios if you haven't

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to Profile page
      navigate('/profile');

    } catch (error) {
      console.error('Login error:', error.response.data.message);
      alert('Login Failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-blur-layer"></div>
      <div className="login-card">
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
        <hr />
        <p>Forgot? <a href="/signup">Password?</a></p>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
