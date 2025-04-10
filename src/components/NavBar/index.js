import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/design">Design</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/SignIn">Sign In</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <ul className="nav-admin">
        <li><Link to="/Admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;