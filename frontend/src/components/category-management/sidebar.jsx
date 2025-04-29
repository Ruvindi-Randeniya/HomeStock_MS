import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom';
import HomeStockLogo from '../../../src/images/category-management/logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
    <div className="sidebar-header">
      <img
        src={HomeStockLogo}
        alt="NestFlow Logo"
        className="sidebar-logo"
      />
    </div>
    <nav className="sidebar-nav">
      <ul>
        <li className="sidebar-item">
        <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
            Home
         </NavLink>
        </li>
        <li className="sidebar-item">
        <NavLink
              to="insertc"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
            Category Management
          </NavLink>
        </li>
        <li className="sidebar-item">
        <NavLink
              to="/overviewc"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
            Category Overview
          </NavLink>
        </li>
        <li className="sidebar-item">
        <NavLink
              to="/inserts"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
            Sub Category Management
          </NavLink>
        </li>
        <li className="sidebar-item">
        <NavLink
              to="/overviews"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
            Sub Category Overview
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Sidebar
