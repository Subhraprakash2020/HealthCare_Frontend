import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import ProviderHeader from "../home/ProviderHeader";
import "../../../css/ProviderAuth.css";
import "../../../css/ProviderCustom.css";

const ProviderSignup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clinicAddress: "",
    gender: "",
    passWord: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/healthcare/providers/signup",
        form
      );
      alert("Provider registered successfully!");
      window.location.href = "/provider/signin";
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <>
      <ProviderHeader className="provider-header shadow-header" />

      <Container fluid className="login-container">
        <Row className="min-vh-100">

          {/* LEFT PANEL → FORM */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Card className="provider-form-card shadow w-100 mx-4">
              <Card.Body>
                <div className="form-header text-center mb-4">
                  <h1>
                    <span>Sign Up</span>
                  </h1>
                </div>

                <Form onSubmit={handleSubmit}>
                  {/* PROVIDER INFO */}
                  <div className="section">
                    <Row className="mb-3">
                      <Col md={12}>
                        <div className="provider-provider-section-title">First Name</div>
                        <Form.Control
                          name="firstName"
                          placeholder="First Name"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col md={12}>
                      <div className="provider-section-title">Last Name</div>
                        <Form.Control
                          name="lastName"
                          placeholder="Last Name"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={12}>
                      <div className="provider-section-title">Email</div>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col md={12}>
                      <div className="provider-section-title">Phone</div>
                        <Form.Control
                          name="phone"
                          placeholder="Phone No."
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      {/* <Col md={12}>
                        <Form.Control
                          name="clinicAddress"
                          placeholder="Clinic Address"
                          value={form.clinicAddress}
                          onChange={handleChange}
                        />
                      </Col> */}
                      <Col md={12}>
                      <div className="provider-section-title">Gender</div>
                        <Form.Select
                          name="gender"
                          value={form.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </div>

                  {/* SECURITY */}
                  <div className="section">
                    <div className="provider-section-title">SECURITY</div>
                    <Form.Control
                      type="password"
                      name="passWord"
                      placeholder="Password (12 chars, strong)"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="submit-btn w-100 mt-3"
                  >
                    CREATE PROVIDER ACCOUNT
                  </Button>

                  <p className="login-link text-center mt-3">
                    Already have an account?{" "}
                    <a href="/provider/signin">Login</a>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT PANEL → IMAGE / INFO */}
          <Col
            md={6}
            className="right-panel d-none d-md-flex align-items-center justify-content-center p-0"
          >
            <div className="right-panel-textbox text-center text-white p-4">
              <h3 className="fw-bold">Welcome, Healthcare Provider</h3>
              <p className="mb-0">
                Empowering care with secure digital access.
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default ProviderSignup;
