import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";


function ProviderAction({ providerId }) {
  const navigate = useNavigate();

  const handleEmailShare = () => {
    const subject = "Provider Profile";
    const body = `Check this provider profile:\n\n${window.location.href}`;
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDirections = () => {
    window.open("https://www.google.com/maps/search/", "_blank");
  };

  const handleBooking = async () => {
    if (!providerId) {
      alert("Provider ID missing");
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please login to book appointment");
        return;
      }

      const { accessToken } = JSON.parse(storedUser);
      const response = await axios.get(
        `http://localhost:8080/healthcare/patient/booking/availability/${providerId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,}
        }
      );

      if (!response.data || response.data.length === 0) {
        alert("No future availability found");
        return;
      }

      // take earliest future availability
      const availabilityId = response.data[0].id;
      console.log("availabilityId",availabilityId)

      navigate(
        `/patient/slot/${availabilityId}?providerId=${providerId}`
      );
    } catch (error) {
      console.error("Error fetching availability", error);
      alert("Unable to fetch availability");
    }
  };

  return (
    <>
      {/* ACTIONS */}
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

      {/* MAP */}
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

      {/* BOOK APPOINTMENT */}
      <Card className="booking-button-card mt-4">
        <Button
          variant="primary"
          className="w-100 btn-custom-green"
          onClick={handleBooking}
        >
          Book Appointment
        </Button>
      </Card>
    </>
  );
}

export default ProviderAction;

ProviderAction.propTypes = {
  providerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

