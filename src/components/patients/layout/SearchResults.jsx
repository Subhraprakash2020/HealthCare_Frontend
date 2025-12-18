import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../../css/custom.css";
import Header from "./Header";
import Footer from "../home/Footer";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];

  if (!results.length) {
    return (
      <Container className="mt-4 text-center">
        <h5>No providers found</h5>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>
    );
  }

  const goToDetails = (providerId) => {
    navigate(`/provider/details/${providerId}`);
  };

  const addToList = (e, providerId) => {
    e.stopPropagation();
    console.log("Added to list:", providerId);
  };

  return (
    <>
      <Header/>
      <Container className="mt-4">
        <Row className="g-4">
          {results.map((item, index) => (
            <Col key={index} lg={3} md={4} sm={6}>
              <Card
                className="provider-card clickable-card text-center"
                onClick={() => goToDetails(item.provider?.id)}
              >
                <div className="add-to-list-top">
                  <Button className="btn-outline-custom-green "
                    size="sm"
                    onClick={(e) => addToList(e, item.provider?.id)}
                  >
                    <i className="bi bi-plus"></i> Add to List
                  </Button>
                </div>

                <div className="provider-image-wrapper">
                  <img
                    src={item.profileImage?.imageUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="provider"
                    className="provider-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
                    }}
                  />
                </div>

                <Card.Body>
                  <h6 className="provider-name">
                    {item.details?.clinicianName}
                  </h6>

                  <div className="provider-actions">
                    <div>
                      <i className="bi bi-envelope"></i>
                      {item.provider?.email}
                    </div>
                  </div>

                  <div className="provider-actions">
                    <div>
                      <i className="bi bi-telephone"></i>
                      {item.provider?.phone}
                    </div>
                  </div>

                  <div className="provider-info">
                    <div>
                      <i className="bi bi-briefcase"></i>
                      {item.details?.levelOfTreatment}
                    </div>

                    <div>
                      <i className="bi bi-geo-alt"></i>
                      {item.address?.city}, {item.address?.state},{" "}
                      {item.address?.zip}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

export default SearchResults;
