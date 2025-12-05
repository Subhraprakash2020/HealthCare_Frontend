import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <h5 className="text-uppercase">Your Company Name</h5>
            <div className="contact-info">
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-white" />
                <a href="mailto:info@yourcompany.com" className="text-white ms-1">
                  info@yourcompany.com
                </a>
              </p>

              <p>
                <FontAwesomeIcon icon={faPhone} className="me-2 text-white" />
                +1 (123) 456-7890
              </p>

              <p className="d-flex align-items-center">
                <FontAwesomeIcon icon={faLinkedin} className="me-2 test-white" />
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-2"
                >
                  Visit Profile
                </a>
              </p>
            </div>

          </Col>
          <Col md={6}>
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white">About Us</Link></li>
              <li><Link to="/services" className="text-white">Our Services</Link></li>
              <li><Link to="/contact" className="text-white">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-white">Privacy Policy</Link></li>
            </ul>
          </Col>
        </Row>
       
        <hr className="bg-light" />
       
        <Row>
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;