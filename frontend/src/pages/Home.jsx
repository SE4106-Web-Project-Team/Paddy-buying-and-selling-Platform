// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PADDY PLATFORM</h1>
        <nav>
            <h2>Main Pages</h2>
            <Link to="/about">About</Link><br />
            <Link to="/blog">Blog</Link><br />  

            <h2>Auth Pages</h2>
            <Link to="/login">Login</Link><br />
            <Link to="/signup">Signup</Link><br />  

            <h2>Feature Pages</h2>
            <Link to="/features/chat">Chat</Link><br />
            <Link to="/features/chatbot">Chatbot</Link><br />
            <Link to="/features/weather">Weather</Link><br />

            <h2>Profile Pages</h2>
            <Link to="/profile">Profile</Link><br />
            <Link to="/profile/edit">Profile Edit</Link><br />

            <h2>Gig Pages</h2>
            <Link to="/gig">Gig</Link><br />
            <Link to="/gig/create">Gig Create</Link><br />
            <Link to="/gig/edit">Gig Edit</Link><br />

            <h2>Shop Pages</h2>
            <Link to="/shop">Shop</Link><br />
            <Link to="/shop/create">Shop Create</Link><br />
            <Link to="/shop/edit">Shop Edit</Link><br />

        </nav>
      </header>
    </div>
  );
}

export default Home;
