import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/login/logo.jpg";

function Sidebar() {
  const location = useLocation(); // to get the current path

  return (
    <div className="d-flex flex-column align-items-center p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      {/* Logo */}
      <img src={logo} alt="Nestflow Logo" style={{ width: "80px", marginBottom: "10px" }} />

      {/* Title */}
      <h5 className="fw-bold mt-2 mb-4">NESTFLOW</h5>

      {/* Sidebar Links */}
      <ul className="nav flex-column w-100">
        <li className="nav-item mb-2">
          <Link
            to="/admin-dashboard"
            className={`nav-link ${location.pathname === '/admin-dashboard' ? 'bg-warning text-dark fw-bold' : 'text-white'}`}
          >
            Manage Users
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/settings"
            className={`nav-link ${location.pathname === '/settings' ? 'bg-warning text-dark fw-bold' : 'text-white'}`}
          >
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'bg-warning text-dark fw-bold' : 'text-white'}`}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
