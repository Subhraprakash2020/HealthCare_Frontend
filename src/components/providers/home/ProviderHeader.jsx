import React from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Images/ProviderLogo.png";
import "../../../css/custom.css";

const ProviderHeader = () => {
  return (
    <Navbar
      bg="white"
      variant="light"
      className="provider-navbar py-3"
    >
      <Container fluid className="px-5">

        {/* Logo + Brand */}
        <Navbar.Brand
          as={Link}
          to="/provider"
          className="d-flex align-items-center gap-2"
        >
          <Image
            src={logo}
            alt="Provider Logo"
            height={38}
            width={38}
            roundedCircle
          />
          <span className="fw-bold fs-5 text-dark">
            Provider Portal
          </span>
        </Navbar.Brand>

        {/* Right-side buttons */}
        <Nav className="ms-auto d-flex align-items-center gap-2">
          <Button as={Link} to="/provider/signup" className="provider-btn">
            Sign Up
          </Button>

          <Button as={Link} to="/provider/signin" className="provider-btn">
            Sign In
          </Button>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default ProviderHeader;
