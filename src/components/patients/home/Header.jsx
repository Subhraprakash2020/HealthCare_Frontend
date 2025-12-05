
import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../../../css/custom.css';

function Header() {
  const location = useLocation();
  const signInClassName  = location.pathname === '/signin' ? 'btn-custom-green' : 'btn-outline-custom-green';
  const signUpClassName  = location.pathname === '/signup' ? 'btn-custom-green' : 'btn-outline-custom-green';
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Your Brand</Navbar.Brand>
        <div className="ms-auto me-3">
          <Link to="/" className="text-white fs-4">
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto">
            <Button as = {Link} to = "/signin" className={`me-2 ${signInClassName}`} variant="custom">Sign In</Button>
            <Button as = {Link} to = "/signup" className={signUpClassName} variant="custom">Sign Up</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;