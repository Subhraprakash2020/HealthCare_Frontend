import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "../home/Footer";

function PatientProfileEdit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) throw new Error("User not logged in");

      const response = await fetch(
        `http://localhost:8080/healthcare/patient/profile/${storedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${storedUser.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.patient) {
        throw new Error("Invalid profile response");
      }

      setFormData({
        firstName: data.patient.firstName || "",
        lastName: data.patient.lastName || "",
        phoneNumber: data.patient.phoneNumber || "",
        email: data.patient.email || "",
        age: data.patient.age || "",
        gender: data.patient.gender || "",
        address: data.patient.address
      });

    } catch (err) {
      console.error("Profile fetch error:", err.message);
      setMessage({ type: "danger", text: err.message });
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const storedUser = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
        "http://localhost:8080/healthcare/patient/updateDetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.accessToken}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber
          }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (err) {
      setMessage({ type: "danger", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container className="text-center mt-5">
          <Spinner animation="border" />
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <Container className="my-5">
        <Row>
          <Col md={10} className="mx-auto">
            <Form className="bg-white p-4 rounded shadow-sm">
              <h5 className="mb-4 text-custom-green">Profile Info</h5>

              {message && (
                <Alert variant={message.type}>{message.text}</Alert>
              )}

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    First Name *
                  </Form.Label>
                  <Form.Control
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    Last Name *
                  </Form.Label>
                  <Form.Control
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    Phone
                  </Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    Email *
                  </Form.Label>
                  <Form.Control value={formData.email} disabled />
                  <Alert variant="warning" className="mt-2 p-2">
                    To change email contact{" "}
                    <strong>info@healthcare.com</strong>
                  </Alert>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    Age
                  </Form.Label>
                  <Form.Control
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    Gender
                  </Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label className="text-custom-green">
                    Address
                  </Form.Label>
                  <Form.Control
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {/* Action Buttons */}
              <Row className="align-items-center mt-4">
                <Col>
                  <Button
                    variant="link"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Col>

                <Col className="text-end">
                  <Button className="btn-custom-green "
                    onClick={handleSubmit}
                    disabled={saving}
                  >
                    <i className="bi bi-save me-2"></i>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </Col>
              </Row>
            </Form>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PatientProfileEdit;
