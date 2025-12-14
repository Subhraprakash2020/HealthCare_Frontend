import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];

  if (!results.length) {
    return (
      <Container className="mt-4 text-center">
        <h5>No providers found</h5>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {results.map((item, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body>
            <h5>{item.details?.clinicianName}</h5>
            <p>
              <strong>Practice:</strong> {item.details?.practices}<br />
              <strong>Level:</strong> {item.details?.levelOfTreatment}<br />
              <strong>Zip:</strong> {item.address?.zip}
            </p>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default SearchResults;
