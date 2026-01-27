import React from "react";
import { Navbar, Container, Nav, Button, Image, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/ProviderLogo.png";
import "../../../css/custom.css";
import "../../../css/ProviderCustom.css"

const ProviderHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/provider/signin");
  };
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

        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link
            as={Link}
            to="/provider/show-slot"
            className="provider-nav-link"
          >
            Show Slots
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/provider/create-availability"
            className="provider-nav-link"
          >
            Create Availability
          </Nav.Link>
          <NavDropdown.Item
            onClick={handleLogout}
            className="dropdown-logout-center"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Log out
          </NavDropdown.Item>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default ProviderHeader;
