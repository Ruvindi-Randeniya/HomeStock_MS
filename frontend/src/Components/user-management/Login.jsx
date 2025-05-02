import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/login/logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }
  
      const role = data.role.toLowerCase(); // ✅ normalize role
  
      // Store token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
  
      // ✅ Use the normalized role for comparison
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "housekeeper") {
        navigate("/item");
      } else {
        setError("Unauthorized role.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-75 shadow-lg rounded">
        {/* Left Section */}
        <div style={{ backgroundColor: "#0a1931" }} className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center p-5">
          <img src={logo} alt="NestFlow Logo" style={{ width: "120px" }} />
          <h3 className="mt-3">NESTFLOW</h3>
          <h4 className="mt-1">A Smarter, More Efficient Home</h4>
          <p className="text-center mt-1">Home Stock Management System</p>
        </div>

        {/* Right Section */}
        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
          <h4 className="mb-4 text-center">Login into your account</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label>Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                </div>
              </div>
            </div>

            <div className="text-end">
              <a href="#" className="text-primary">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-warning w-100 mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
