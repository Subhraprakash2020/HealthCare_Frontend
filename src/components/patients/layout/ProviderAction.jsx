import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../../css/custom.css";

function ProviderAction() {

  const handleEmailShare = () => {
    const subject = "Provider Profile";
    const body = `Check this provider profile:\n\n${window.location.href}`;
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/search/`,
      "_blank"
    );
  };

  return (
    <>
      <Card className="mb-4 action-card">
        <Card.Body className="p-0">
          <Button
            variant="success"
            className="w-100 action-btn"
            onClick={handleEmailShare}
          >
            <i className="bi bi-envelope me-2"></i> Share via Email
          </Button>

          <Button variant="success" className="w-100 action-btn">
            <i className="bi bi-chat-dots me-2"></i> Share via SMS
          </Button>

          <Button
            variant="success"
            className="w-100 action-btn"
            onClick={handlePrint}
          >
            <i className="bi bi-printer me-2"></i> Print Profile
          </Button>

          <Button variant="success" className="w-100 action-btn">
            <i className="bi bi-bookmark me-2"></i> Bookmark
          </Button>

          <Button variant="success" className="w-100 action-btn">
            <i className="bi bi-plus-circle me-2"></i> Add to List
          </Button>

        </Card.Body>
      </Card>

      <Card className="map-card">
        <Card.Body>
          <h6 className="mb-3">
            <i className="bi bi-geo-alt-fill me-2 text-custom-green"></i> Map
          </h6>

          <Button
            className="btn-custom-green me-2"
            size="sm"
            onClick={handleDirections}
          >
            Load Map
          </Button>

          <Button
            className="btn-custom-green"
            size="sm"
            onClick={handleDirections}
          >
            Get Directions
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProviderAction;
