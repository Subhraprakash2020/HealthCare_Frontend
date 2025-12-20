import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Header from "./Header";
import Footer from "../home/Footer";
import "../../../css/custom.css";

function ProviderDetails() {
  const { providerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(
    location.state?.provider || null
  );
  const [loading, setLoading] = useState(
    !location.state?.provider
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!provider) {
      fetchProviderDetails();
    }
  }, [providerId]);

  const fetchProviderDetails = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("User not logged in");
      }

      const { accessToken } = JSON.parse(storedUser);

      const response = await fetch(
        `http://localhost:8080/healthcare/providers/details/${providerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch provider details");
      }

      const data = await response.json();

      setProvider({
        provider: data.provider,
        details: data.providerDetails,
        address: data.providerAddress,
        profileImage: data.providerProfileImage
      });

    //   setProvider(data);
    } catch (err) {
      console.error("ProviderDetails error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
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

  if (error || !provider) {
    return (
      <>
        <Header />
        <Container className="text-center mt-5">
          <h5>Provider not found</h5>
          <Button className="mt-3" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Container>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Header />

      <Container className="mt-4 provider-details-page">
        <Card className="provider-header-card mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3} className="text-center">
                <img
                  src={
                    provider.profileImage?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="provider"
                  className="provider-header-image"
                />
              </Col>

              <Col md={9}>
                <h4 className="provider-header-name">
                  {provider.details?.clinicianName}
                </h4>

                <p className="provider-header-text">
                  <i className="bi bi-briefcase-fill"></i>{" "}
                  {provider.details?.practices}
                </p>

                <p className="provider-header-text">
                  <i className="bi bi-phone-fill"></i>{" "}
                  {provider.provider?.phone}
                </p>

                <p className="provider-header-text">
                  <i className="bi bi-envelope-fill"></i>{" "}
                  {provider.provider?.email}
                </p>

                <p className="provider-header-text">
                  <i className="bi bi-geo-alt-fill"></i>{" "}
                  {provider.address?.city},{" "}
                  {provider.address?.state},{" "}
                  {provider.address?.zip}
                </p>

              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="provider-section-card mb-4">
          <Card.Body>
            <h5 className="section-title">
              <i className="bi bi-pencil-square"></i> About me
            </h5>
            <p className="section-text">
              {provider.details?.aboutMe || "N/A"}
            </p>
          </Card.Body>
        </Card>

        <Card className="provider-section-card mb-4">
          <Card.Body>
            <h5 className="section-title">
              <i className="bi bi-mortarboard-fill"></i>{" "}
              Qualification Experience
            </h5>

            <table className="table table-borderless mt-3 details-table">
              <tbody>
                <tr>
                  <th>Level of Treatment</th>
                  <td>{provider.details?.levelOfTreatment}</td>
                </tr>

                <tr>
                  <th>Patient Age Bracket</th>
                  <td>{provider.details?.patientAgeBracket}</td>
                </tr>

                <tr>
                  <th>Experience</th>
                  <td>
                    {provider.details?.experienceYears} Years
                  </td>
                </tr>

                <tr>
                  <th>Availability</th>
                  <td>
                    {provider.details?.availabilityInWeek},{" "}
                    {provider.details?.availabilityTime}
                  </td>
                </tr>

                <tr>
                  <th>Consulting Fee</th>
                  <td>₹ {provider.details?.consultingFee}</td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>
    </>
  );
}

export default ProviderDetails;