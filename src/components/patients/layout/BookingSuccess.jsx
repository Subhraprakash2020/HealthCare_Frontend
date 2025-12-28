import { Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <Card className="p-4 text-center shadow">
        <h4 className="text-success mb-3">Booking Confirmed 🎉</h4>

        <p>
          <strong>Date:</strong> {state?.selectedDate}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {state?.slot?.startTime} – {state?.slot?.endTime}
        </p>

        <Button onClick={() => navigate("/patient/bookings")}>
          View My Bookings
        </Button>
      </Card>
    </div>
  );
}

export default BookingSuccess;
