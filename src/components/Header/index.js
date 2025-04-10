import React from "react";
import ThemeToggle from "../ThemeToggle";
import logo from "../../assets/logo.png"; // Ensure the path is correct
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" /> {/* Ensure the path is correct */}
      </div>
      <div className="contact-info">
        <p>8226 Warren Sharon Rd, Masury, OH 44438, United States</p>
        <p>Call Us: +1 330 540 7587</p>
        <p>Email: <a href="mailto:inknthreadworks@tsrus.com">inknthreadworks@tsrus.com</a></p>
        <p>
          <a href="https://www.facebook.com/inknthreadworks" target="_blank" rel="noopener noreferrer">
            Visit our Facebook
          </a>
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;