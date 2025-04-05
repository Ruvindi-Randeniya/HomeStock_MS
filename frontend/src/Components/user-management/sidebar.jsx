import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../../assets/login/logo.jpg";

function sidebar() {
  return (
    <div className="d-flex flex-column align-items-center p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      {/* Logo */}
      <img src={logo} alt="Nestflow Logo" style={{ width: "150px", marginBottom: "8px" }} />

      <hr style={{ width: "100%", borderColor: "white" }} />

      {/* Sidebar Links */}
      <ul className="nav flex-column w-100">
  <li className="nav-item">
    <Link to="/" className="nav-link text-white">Home</Link>
  </li>
  <li className="nav-item">
    <Link to="/settings" className="nav-link text-white">Settings</Link>
  </li>
  <li className="nav-item">
    <Link to="/help" className="nav-link text-white">Help Center</Link>
  </li>
</ul>
    </div>
  );
};

export default sidebar
