import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import Sidebar from "./sidebar";
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchRole, setSearchRole] = useState(""); // To store the role for search filter
  const [filteredUsers, setFilteredUsers] = useState([]); // To store filtered users for display

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users with all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle search by role
  const handleSearchChange = (e) => {
    const role = e.target.value;
    setSearchRole(role);

    const filtered = users.filter(user =>
      user.role.toLowerCase().includes(role.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(users.filter(user => user._id !== id));
        setFilteredUsers(filteredUsers.filter(user => user._id !== id)); // Keep filtered list updated
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("User Report - Admin Dashboard", 14, 15);
  
    // Using autoTable to create a table in the PDF
    autoTable(doc, {
      startY: 25,
      head: [["Name", "Email", "Role"]],
      body: filteredUsers.map((user) => [
        `${user.firstname} ${user.lastname}`,  // Combine first and last name
        user.email,                          // User's email
        user.role,                           // User's role
      ]),
    });
  
    doc.save("user-report.pdf");
  };
  

  return (
    <div className="d-flex">
      <Sidebar />

      <Container className="text-center mt-5">
        <Row className="justify-content-center mb-4">
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center">
              <Card.Body>
                <Card.Title className="fs-5">Total Users</Card.Title>
                <h2 className="fw-bold">{users.length}</h2>
                <hr />
                <Link to="/add-new-user">
                  <Button variant="warning" className="fw-bold px-4">Add New User</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-between mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by role"
              value={searchRole}
              onChange={handleSearchChange}
              className="mb-3"
              style={{ backgroundColor: '#f0f8ff', borderColor: '#ddd' }} // Highlighted search box
            />
          </Col>
          <Col md={3} className="text-end">
            <Button
              variant="primary"
              className="fw-bold"
              onClick={generateReport}
            >
              Generate Report (PDF)
            </Button>
          </Col>
        </Row>

        <Table bordered hover className="shadow-sm">
          <thead className="bg-warning">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/admin/update-user/${user._id}`} className="btn btn-warning btn-sm me-2">
                      Update
                    </Link>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminDashboard;
