import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="homepage-footer">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <div className="footer-brand">
              <span className="brand-mark">
                <i className="bi bi-plus-lg"></i>
              </span>
              <div>
                <strong>HealthCare+</strong>
                <span>Trusted digital healthcare access</span>
              </div>
            </div>
            <p className="footer-copy">
              Reliable appointments, specialist discovery, and coordinated patient
              care in one responsive healthcare platform.
            </p>
          </Col>

          <Col sm={6} lg={2}>
            <h6>Explore</h6>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#doctors">Doctors</a>
              <a href="#testimonials">Testimonials</a>
            </div>
          </Col>

          <Col sm={6} lg={3}>
            <h6>Account</h6>
            <div className="footer-links">
              <Link to="/patient/signin">Sign In</Link>
              <Link to="/patient/signup">Sign Up</Link>
              <Link to="/provider/signin">Provider Portal</Link>
            </div>
          </Col>

          <Col lg={3}>
            <h6>Contact</h6>
            <div className="footer-contact">
              <span>support@healthcareplus.com</span>
              <span>+91 98765 43210</span>
              <span>Mon - Sat, 8:00 AM - 8:00 PM</span>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} HealthCare+. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
