import React from 'react';
import Sidebar from "./sidebar"; // Assuming Sidebar.jsx exists
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import profileImage from "../../assets/UserProfile/th.jpg"; // Replace with actual profile image

function UserProfile() {
    return (
        <div className="d-flex">
          {/* Sidebar */}
          <Sidebar />
    
          {/* Main Profile Section */}
          <Container fluid className="p-4">
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                {/* Profile Image */}
                <img
                  src={profileImage} // Replace with actual profile image
                  alt="Profile"
                  className="rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h3>Alexa Rawles</h3>
                <p className="text-muted">alexarawles@gmail.com</p>
    
                {/* Action Buttons */}
                <div className="mb-3">
                  <Button variant="outline-primary" className="me-2">
                    Edit Profile
                  </Button>
                  <Button variant="outline-danger" className="me-2">
                    Invitations
                  </Button>
                  <Button variant="outline-danger">Alerts</Button>
                </div>
    
                {/* Important Notices */}
                <Card className="mb-3">
  <Card.Body>
    <h5>Important Notices</h5>
    <div className="d-flex align-items-center">
      
      {/* Left align Admin */}
      <div className="text-start w-100"> 
        <strong>Admin</strong>
        <p className="mb-1">Invitations Received</p>
        <Button variant="link" className="p-0">
          Action
        </Button>
      </div>

    </div>
  </Card.Body>
</Card>

    
                {/* Logout Button */}
                <Button variant="danger">Log Out</Button>
              </Col>
            </Row>
          </Container>
        </div>
  );
};

export default UserProfile
