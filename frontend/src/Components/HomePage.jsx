import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kitchen from "../assets/kitchen.jpeg";
import bathroom from "../assets/bathroom.jpeg";
import study from "../assets/study.jpeg";
import bedroom from "../assets/bedroom.jpeg";
import logo from "../assets/logo.png";
import profileIcon from "../assets/UserProfile/th.jpg";

const heroImages = [kitchen, bathroom, study, bedroom];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-[#01143b] text-white py-4 px-6 md:px-12 flex items-center justify-between shadow-md z-50 relative">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
          <div>
            <h1 className="font-['Poppins'] text-3xl font-extrabold tracking-wider text-yellow-300">
              NESTFLOW
            </h1>
            <p className="text-xs text-gray-200">
              YOUR HOME. YOUR FLOW. YOUR CONTROL
            </p>
          </div>
        </div>

        {/* Nav Links + Profile */}

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-3 font-medium text-sm md:text-base">
            <Link
              to="/home-page"
              className="px-3 py-1 rounded-md no-underline text-white hover:bg-yellow-300 hover:text-black transition"
            >
              Home
            </Link>
            <Link
              to="/insert-category"
              className="px-3 py-1 rounded-md no-underline text-white hover:bg-yellow-300 hover:text-black transition"
            >
              Category
            </Link>
            <Link
              to="/home"
              className="px-3 py-1 rounded-md no-underline text-white hover:bg-yellow-300 hover:text-black transition"
            >
              Items
            </Link>
            <Link
              to="/contact"
              className="px-3 py-1 rounded-md no-underline text-white hover:bg-yellow-300 hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Profile Icon + Logout */}
          <div className="flex items-center space-x-4">
          <Link
              to="/user-profile"
              className="px-3 py-1 rounded-md no-underline text-white hover:bg-yellow-300 hover:text-black transition"
            >
            
            <img
              src={profileIcon}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
              </Link>
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer text-white font-medium text-sm"
            >
              Logout
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={heroImages[currentImageIndex]}
          alt="Hero"
          className="w-full h-full object-cover absolute top-0 left-0 z-0 transition duration-1000"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
            WELCOME TO NESTFLOW
          </h2>
          <p className="mt-3 text-xl md:text-2xl font-light">
            YOUR HOME. YOUR FLOW. YOUR CONTROL.
          </p>
          <button className="mt-6 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-medium">
            See More
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <section className="py-12 px-6 md:px-20 bg-white">
        <h3 className="text-3xl font-bold mb-8 text-center text-[#01143b]">
          Explore Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[kitchen, bathroom, study, bedroom].map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={img}
                alt={`Room ${i + 1}`}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 text-center font-semibold text-[#01143b]">
                {["Kitchen", "Bathroom", "Study", "Bedroom"][i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#01143b] text-white text-center p-6 mt-10">
        <p>&copy; {new Date().getFullYear()} NestFlow. All rights reserved.</p>
        <div className="mt-2 space-x-4 text-sm">
          <a href="#" className="hover:text-yellow-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-300">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
