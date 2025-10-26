import React from "react";
import "./Navbar.css";
import Logo from '../../assets/logo1.png'

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo (left side) */}
      <div className="logo">
        <img src="./logo1.png" alt="Logo" />
      </div>

      {/* Nav links (right side) */}
      <ul className="nav-links">
        <li><a href="#analyzer">Analyzer</a></li>
        <li><a href="#help">Help</a></li>
        <li><a href="#chatbot">Chat Bot</a></li>
        <li><a href="#contact">Contact-Us</a></li>
      </ul>

      {/* Sign in button */}
      <button className="signin-btn">Sign-in</button>
    </nav>
  );
}
