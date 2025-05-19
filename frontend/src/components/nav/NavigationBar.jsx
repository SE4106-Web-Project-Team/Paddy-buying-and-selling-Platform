// NavigationBar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/home/navBar.css";

function NavigationBar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleChange = (e) => {
    const url = e.target.value;
    if (url) navigate(url);
  };

  return (
    <nav>
      <h1 onClick={() => navigate("/")}>PADDY PLATFORM</h1>
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <select
            value={selected}
            onChange={handleChange}
            className="nav-select"
          >
            <option value="">Features</option>
            <option value="/features/weather">Weather</option>
            <option value="/features/chat">Chat</option>
            <option value="/features/chatbot">Chatbot</option>
          </select>
        </li>
        <li>
          <NavLink
            to="/gigs"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Gigs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/paddyprice"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Paddy Prices
          </NavLink>
        </li>
        <li className="nav-login">
          {isLoggedIn ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
