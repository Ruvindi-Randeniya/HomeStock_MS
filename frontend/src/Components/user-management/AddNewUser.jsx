import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"; 

const AddNewUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New User:", user);
  };

  const handleClear = () => {
    setUser({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      role: "",
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />
    

      {/* Form Content */}
      <div className="container d-flex align-items-center justify-content-center flex-grow-1">
        <div className="col-md-8 col-lg-6 shadow-lg rounded p-4">
          <h2 className="text-center">ADD NEW USER</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select className="form-control" name="role" value={user.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="household">Household Owner</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button type="submit" className="btn btn-danger">Send Invitation</button>
              <button type="button" className="btn btn-warning" onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;