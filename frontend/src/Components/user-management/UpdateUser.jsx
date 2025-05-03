import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: "",
            role: data.role,
          });
        } else {
          setError(data.message || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.firstName || !user.lastName || !user.email || !user.role) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(user.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role,
        }),
      });

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setSuccess("User updated successfully!");
      } else {
        setError(data.message || "Error updating user");
      }
    } catch (err) {
      console.error("Error during user update:", err);
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  const handleClear = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container d-flex align-items-center justify-content-center flex-grow-1">
        <div className="col-md-8 col-lg-6 shadow-lg rounded p-4">
          <h2 className="text-center">UPDATE USER</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password (Leave empty to keep the same):</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select
                className="form-control"
                name="role"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="housekeeper">Housekeeper</option>
              </select>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button type="submit" className="btn btn-danger" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
              <button type="button" className="btn btn-warning" onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
