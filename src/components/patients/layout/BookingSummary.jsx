import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookingSummary({ slot, providerId, selectedDate }) {
  const navigate = useNavigate();

  if (!slot) {
    return (
      <Card className="p-3 text-muted">
        Select a slot to see booking details
      </Card>
    );
  }

  const handleConfirmBooking = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const { accessToken } = JSON.parse(storedUser);

      await axios.post(
        `http://localhost:8080/healthcare/patient/booking/${slot.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      navigate("/patient/booking-success", {
        state: { slot, providerId, selectedDate },
      });
    } catch (err) {
      alert("Booking failed");
      console.error(err);
    }
  };

  return (
    <>
      <Card className="p-2 shadow-sm text-center action-card">
        <h6 className="mt-2">Booking Summary</h6>
      </Card>
      <Card className="p-3 mt-2 shadow-sm">

        <div className="mb-2">
          <strong>Date:</strong> {selectedDate}
        </div>

        <div className="mb-2">
          <strong>Time:</strong> {slot.startTime} – {slot.endTime}
        </div>

        <div className="mb-3">
          <strong>Available Seats:</strong>{" "}
          {slot.maxCapacity - slot.bookedCount}
        </div>

        <Button
          variant="success"
          className="w-100 btn-custom-green"
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </Button>
      </Card>
    </>
  );
}

export default BookingSummary;



