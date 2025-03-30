import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import Sidebar from "./sidebar";

function AdminDashboard() {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

        <Container className="text-center mt-5">
        {/* Stats Section */}
        <Row className="justify-content-center mb-4 gap-5">
          <Col md={3}>
            <Card className="p-3 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-5">Total Users</Card.Title>
                <h2 className="fw-bold">0</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-5">Sent Invitations</Card.Title>
                <h2 className="fw-bold">0</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Add User Button */}
        <Button variant="warning" className="fw-bold mb-4">Add New User</Button>
        
        {/* User Table */}
        <Table bordered hover className="shadow-sm">
          <thead className="bg-warning">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Data Rows will be added dynamically */}
          </tbody>
        </Table>
      </Container>
      </div>
      );
};

export default AdminDashboard
