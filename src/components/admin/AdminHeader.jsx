import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../css/admin/AdminHeader.css"

const AdminHeader = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand fw-bold" href="#">
        RG-Admin
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <a className="nav-link active" href="#">
              Dashboard
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Patient
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Activity Logs</a></li>
              <li><a className="dropdown-item" href="#">Audit Logs</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Provider
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Pages</a></li>
              <li><a className="dropdown-item" href="#">Categories</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Admin
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Users</a></li>
              <li><a className="dropdown-item" href="#">Visitors</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Site Activities
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Users</a></li>
              <li><a className="dropdown-item" href="#">Visitors</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Reports
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Daily Reports</a></li>
              <li><a className="dropdown-item" href="#">Monthly Reports</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default AdminHeader;