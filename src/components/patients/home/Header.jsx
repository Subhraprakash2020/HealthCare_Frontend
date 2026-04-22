import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const hideHomeMenuLinks =
    location.pathname === "/patient/signin" ||
    location.pathname === "/patient/signup";
  const signInClassName =
    location.pathname === "/patient/signin" ? "nav-btn-solid" : "nav-btn-outline";
  const signUpClassName =
    location.pathname === "/patient/signup" ? "nav-btn-solid" : "nav-btn-outline";

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
          {!hideHomeMenuLinks && (
            <Nav className="mx-auto healthcare-nav-links">
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#doctors">Doctors</Nav.Link>
              <Nav.Link href="#testimonials">Testimonials</Nav.Link>
            </Nav>
          )}

          <div className="healthcare-nav-actions ms-auto">
            <Button as={Link} to="/patient/signin" className={signInClassName}>
              Sign In
            </Button>
            <Button as={Link} to="/patient/signup" className={signUpClassName}>
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
