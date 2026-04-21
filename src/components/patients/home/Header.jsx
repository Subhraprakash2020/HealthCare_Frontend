import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="healthcare-navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="healthcare-brand">
          <span className="brand-mark">
            <i className="bi bi-plus-lg"></i>
          </span>
          <div>
            <strong>HealthCare+</strong>
            <span>Modern patient care</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="home-navbar-nav" />

        <Navbar.Collapse id="home-navbar-nav">
          <Nav className="mx-auto healthcare-nav-links">
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#doctors">Doctors</Nav.Link>
            <Nav.Link href="#testimonials">Testimonials</Nav.Link>
          </Nav>

          <div className="healthcare-nav-actions">
            <Button as={Link} to="/patient/signin" className="nav-btn-outline">
              Sign In
            </Button>
            <Button as={Link} to="/patient/signup" className="nav-btn-solid">
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
