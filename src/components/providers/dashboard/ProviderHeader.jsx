import React, { useContext, useEffect } from "react";
import { Navbar, Container, Nav, Button, NavDropdown, Image as RBImage } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/ProviderLogo.png";
import "../../../css/custom.css";
import "../../../css/ProviderCustom.css"
import { ProviderProfileContext } from "./ProviderProfileContext";
import axios from "axios";


const ProviderHeader = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {
    profileImage,
    setProfileImage,
    profileName,
    setProfileName,
  } = useContext(ProviderProfileContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/provider/signin");
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/healthcare/provider/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          const name = (res.data.firstName && res.data.lastName)
            ? `${res.data.firstName} ${res.data.lastName}`
            : res.data.firstName || res.data.lastName || "Provider";
          setProfileName(name);
          setProfileImage(res.data.imageUrl);
        }
      })
      .catch(() => {
        console.warn("Provider profile not loaded");
      });
  }, [token, setProfileImage, setProfileName]);



  return (
    <Navbar bg="white" variant="light" expand="lg" className="provider-navbar py-3">
      <Container fluid className="px-5">

        {/* Logo + Brand */}
        <Navbar.Brand
          as={Link}
          to="/provider"
          className="d-flex align-items-center gap-2"
        >
          <RBImage
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

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link
              as={Link}
              to="/provider/show-slot"
              className="provider-nav-link text-nowrap"
            >
              Show Slots
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/provider/create-availability"
              className="provider-nav-link text-nowrap"
            >
              Create Availability
            </Nav.Link>

            <NavDropdown
              align="end"
              id="user-profile-dropdown"
              className="dropdown-two-column"
              title={
                <span className="profile-dropdown-title">
                  <RBImage
                    src={
                      profileImage ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    roundedCircle
                    className="profile-avatar-provider"
                  />
                  <span className="provider-profile-name ms-2">
                    {profileName || "User Profile"}
                  </span>
                </span>
              }
            >
              <NavDropdown.Item as={Link} to="/provider/profile">
                <i className="bi bi-person-circle me-2"></i>
                My Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/provider/profile/edit">
                <i className="bi bi-person-fill-gear me-2"></i>
                Edit Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/provider/profile/image">
                <i className="bi bi-cloud-upload-fill me-2"></i>
                Upload my profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={handleLogout}
                className="dropdown-logout-center"
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default ProviderHeader;
