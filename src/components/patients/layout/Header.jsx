import React, { useEffect, useState, useContext } from "react";
import { Navbar, Container, Nav, NavDropdown, Image as RBImage } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../css/custom.css";
import { ProfileContext } from "./ProfileContext";


function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { profileImage, setProfileImage } = useContext(ProfileContext);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    imageUrl: null
  });



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/healthcare/patient/profile-image/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setProfile({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          imageUrl: res.data.imageUrl
        });
        if(res.data.imageUrl){
          setProfileImage(res.data.imageUrl);
        }
      })
      .catch(() => {
        console.warn("Profile not loaded");
      });
  }, [token, setProfileImage]);

  const user = JSON.parse(localStorage.getItem("user"));
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User Profile";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/patient/dashboard">
          Your Brand
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center">
          <Link to="/" className="text-white fs-4 me-4">
            <i className="fa-solid fa-house"></i>
          </Link>

        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              align="end"
              id="user-profile-dropdown"
              className="dropdown-two-column"
              title={
                <span className="profile-dropdown-title">
                  <RBImage
                    src={
                      profileImage || profile.imageUrl ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    roundedCircle
                    className="profile-avatar"
                  />
                  <span className="profile-name">{fullName}</span>
                </span>
              }
            >
              <NavDropdown.Item as={Link} to="/profileInfo">
                <i className="bi bi-person-circle me-2"></i>
                My Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/profileInfo/edit">
                <i className="bi bi-person-fill-gear me-2"></i>
                Edit Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/profileImage/edit">
                <i className="bi bi-cloud-upload-fill me-2"></i>
                Upload my profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/profile/shared">
                <i className="bi bi-share-fill me-2"></i>
                Shared public profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/another-link">
                <i className="bi bi-link-45deg me-2"></i>
                Another link
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
}

export default Header;
