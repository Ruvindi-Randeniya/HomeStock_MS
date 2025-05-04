import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <img src={logo} alt="Logo" className="w-24 h-24 rounded-full mb-4 mx-auto" />
      
      <Link to="/home-page">
        <h4 className="text-center text-xl font-bold mb-4 hover:text-yellow-500 cursor-pointer">
          NESTFLOW
        </h4>
      </Link>

      <nav className="flex flex-col space-y-2">
        <Link 
          to="/home" 
          className={`py-2 px-4 rounded ${location.pathname === "/home" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}
        >
          Home
        </Link>
        <Link 
          to="/add-item" 
          className={`py-2 px-4 rounded ${location.pathname === "/add-item" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}
        >
          Add Items
        </Link>
        <Link 
          to="/item-management" 
          className={`py-2 px-4 rounded ${location.pathname === "/item-management" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}
        >
          Item Management
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
