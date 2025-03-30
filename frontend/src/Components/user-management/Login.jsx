import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/login/logo.jpg";

const Login = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-75 shadow-lg rounded">
        {/* Left Section */}
        <div style={{ backgroundColor: "#0a1931" }} className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center p-5">
        <img src={logo} alt="NestFlow Logo" style={{ width: "120px" }} />
          <h3 className="mt-3">NESTFLOW</h3>
          <h4 className="mt-1">A Smarter, More Efficient Home</h4>
            <p className="text-center mt-1">
            Home Stock Management System
          </p>
        </div>

        {/* Right Section */}
        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
          <h4 className="mb-4 text-center">Login into your account</h4>
          <form>
            <div className="form-group mb-3">
              <label>Username</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
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

            <button 
  className="btn btn-warning w-100 mt-3"
>
  Login
</button>
          </form>
        </div>
      </div> 
    </div>
  );
};

export default Login;
