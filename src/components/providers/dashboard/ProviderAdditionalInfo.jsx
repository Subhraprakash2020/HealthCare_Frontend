import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import ProviderHeader from "./ProviderHeader";
import "../../../css/ProviderCustom.css"

function ProviderAdditionalInfo() {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const providerId = storedUser?.id;

  const [details, setDetails] = useState({
    clinicianName: "",
    practices: "",
    levelOfTreatment: "",
    patientAgeBracket: "",
    experienceYears: "",
    availabilityInWeek: "",
    availabilityTime: "",
    consultingFee: "",
    aboutMe: "",
  });

  const [practicesOptions, setPracticesOptions] = useState([]);
  const [treatmentLevels, setTreatmentLevels] = useState([]);

  /* ---------------- ADDRESS LIST ---------------- */
  const [addresses, setAddresses] = useState([
    { address: "", city: "", state: "", zip: "" },
  ]);

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, e) => {
    const updated = [...addresses];
    updated[index][e.target.name] = e.target.value;
    setAddresses(updated);
  };

  const addAddress = () => {
    setAddresses([...addresses, { address: "", city: "", state: "", zip: "" }]);
  };

  const removeAddress = (index) => {
    if (addresses.length === 1) return;
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/healthcare/provider/options/practices")
      .then((res) => setPracticesOptions(res.data))
      .catch(() => console.warn("Failed to load practices"));

    axios
      .get("http://localhost:8080/healthcare/provider/options/treatment-levels")
      .then((res) => setTreatmentLevels(res.data))
      .catch(() => console.warn("Failed to load treatment levels"));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/healthcare/providers/details/add",
        {
          providerId,
          ...details,
          ...addresses[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Provider details added successfully");
    } catch (err) {
      alert(err.response?.data || "Failed to save details");
    }
  };

  return (
    <>
      <ProviderHeader />

      <Container className="my-4">
        <Form onSubmit={handleSubmit}>

          {/* ================= PROVIDER DETAILS ================= */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="provider-card-background">
              Provider Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Clinician Name *</Form.Label>
                    <Form.Control
                      name="clinicianName"
                      value={details.clinicianName}
                      onChange={handleDetailsChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Practices</Form.Label>
                    <Form.Select
                        name="practices"
                        value={details.practices}
                        onChange={handleDetailsChange}
                      >
                        <option value="">Select Practice</option>
                        {practicesOptions.map((p) => (
                          <option key={p} value={p}>
                            {p.replaceAll("_", " ")}
                          </option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Level of Treatment</Form.Label>
                    <Form.Select
                      name="levelOfTreatment"
                      value={details.levelOfTreatment}
                      onChange={handleDetailsChange}
                    >
                      <option value="">Select Treatment Level</option>
                      {treatmentLevels.map((level) => (
                        <option key={level} value={level}>
                          {level.replaceAll("_", " ")}
                        </option>
                      ))}
                    </Form.Select>

                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Age Bracket</Form.Label>
                    <Form.Control
                      name="patientAgeBracket"
                      value={details.patientAgeBracket}
                      onChange={handleDetailsChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Experience (Years)</Form.Label>
                    <Form.Control
                      type="number"
                      name="experienceYears"
                      value={details.experienceYears}
                      onChange={handleDetailsChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>About Me</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="aboutMe"
                  value={details.aboutMe}
                  onChange={handleDetailsChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* ================= PRACTICE ADDRESS ================= */}
          <Card className="shadow-sm">
            <Card.Header className="provider-card-background">
              Practice Street Address
            </Card.Header>

            <Card.Body>
              {addresses.map((addr, index) => (
                <div key={index} className="border rounded p-3 mb-3 position-relative">

                  {/* Remove Button */}
                  {addresses.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => removeAddress(index)}
                    >
                      ✕
                    </Button>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      name="address"
                      value={addr.address}
                      onChange={(e) => handleAddressChange(index, e)}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>State *</Form.Label>
                        <Form.Control
                          name="state"
                          value={addr.state}
                          onChange={(e) => handleAddressChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          name="city"
                          value={addr.city}
                          onChange={(e) => handleAddressChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Zip Code *</Form.Label>
                        <Form.Control
                          name="zip"
                          value={addr.zip}
                          onChange={(e) => handleAddressChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              ))}

              {/* <div className="text-end">
                <Button
                  variant="outline-success"
                  onClick={addAddress}
                >
                  + Add Another Address
                </Button>
              </div> */}
            </Card.Body>
          </Card>

          {/* ================= SUBMIT ================= */}
          <div className="text-end mt-4">
            <Button
              type="submit"
              className="provider-card-background"
            >
              Save Details
            </Button>
          </div>

        </Form>
      </Container>
    </>
  );
}

export default ProviderAdditionalInfo;
