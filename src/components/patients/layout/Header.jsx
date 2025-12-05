import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/custom.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token + user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to signin page
    navigate("/signin");
  };

  const isLoggedIn = !!localStorage.getItem("token"); // true/false

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Your Brand
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center">
          {/* Home Icon */}
          <Link to="/" className="text-white fs-4 me-4">
            <i className="fa-solid fa-house"></i>
          </Link>

          {/* Show Logout Only If Logged In */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
            >
              Logout
            </button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
