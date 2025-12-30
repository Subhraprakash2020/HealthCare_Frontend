import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "../../../css/ProviderAuth.css";
import { FaGoogle, FaGithub } from "react-icons/fa";
import ProviderHeader from "../../providers/home/ProviderHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProviderSignin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/healthcare/providers/login",
        {
          email,
          passWord: password, // ✅ matches backend DTO
        }
      );

      const { token, id, email: providerEmail, role } = response.data;

      // 🔒 Extra safety: frontend role check
      if (role !== "PROVIDER") {
        setError("Access denied: Provider account required");
        setLoading(false);
        return;
      }

      // ✅ Store auth info
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          email: providerEmail,
          role,
        })
      );

      navigate("/provider/dashboard");

    } catch (err) {
      const message =
        err.response?.data ||
        err.response?.data?.message ||
        "❌ Invalid credentials or access denied";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProviderHeader className="provider-header shadow-header" />

      <Container fluid className="login-container">
        <Row className="h-100">

          {/* LEFT SECTION */}
          <Col
            md={6}
            className="left-panel d-none d-md-flex align-items-center justify-content-center p-0"
          >
            <div className="left-panel-textbox text-center text-white p-4">
              <h3 className="fw-bold">Welcome, Healthcare Provider</h3>
              <p className="mb-0">Empowering care with secure digital access.</p>
            </div>
          </Col>

          {/* RIGHT SECTION */}
          <Col md={6} className="d-flex align-items-center justify-content-center bg-white p-5">
            <div className="login-form-wrapper">
              <h2 className="mb-4 fw-bold">Sign In</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="text-end mb-4">
                  <a href="/provider/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-100 login-button"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>

              <div className="divider my-4">
                <span className="or-text">OR</span>
              </div>

              <div className="d-flex gap-3 justify-content-center mb-4">
                <Button variant="outline-secondary" className="w-50">
                  <FaGoogle className="me-2" /> Google
                </Button>
                <Button variant="outline-dark" className="w-50">
                  <FaGithub className="me-2" /> GitHub
                </Button>
              </div>

              <p className="text-center mt-3">
                Don't have an account?
                <a href="/provider/signup" className="signup-link"> Sign Up</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProviderSignin;
