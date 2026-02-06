import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Alert,
  Badge,
  Form
} from "react-bootstrap";
import axios from "axios";
import ProviderHeader from "./ProviderHeader";

const ShowSlots = () => {
  const token = localStorage.getItem("token");

  const getProviderId = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser).id;
    return localStorage.getItem("providerId");
  };

  const providerId = getProviderId();

  const dates = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  }, []);

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState(
    providerId ? "" : "Provider not logged in"
  );
  const [isLoading, setIsLoading] = useState(false);

  const [showTiles, setShowTiles] = useState(false);

  const loadSlots = async (date) => {
    if (!providerId) return;

    setSelectedDate(date);
    setMessage("");
    setSlots([]);
    setIsLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8080/healthcare/provider/slot/${providerId}/date/${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSlots(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load slots");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (providerId && dates[0]) {
      loadSlots(dates[0]);
    }
  }, []);

  return (
    <>
      <ProviderHeader />

      <Container className="mt-4">
        <Card className="p-3 mb-3 shadow-sm">
          <h5>Select Date</h5>
          <div className="d-flex gap-2 flex-wrap">
            {dates.map((date) => (
              <Button
                key={date}
                className={
                  date === selectedDate
                    ? "btn-custom-primary"
                    : "btn-custom-outline"
                }
                onClick={() => loadSlots(date)}
              >
                {date}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Slots for {selectedDate}</h5>

            <Form.Check
              type="switch"
              id="slot-view-switch"
              label={showTiles ? "Tile View" : "Table View"}
              checked={showTiles}
              onChange={() => setShowTiles(!showTiles)}
            />
          </div>

          {message && <Alert variant="danger">{message}</Alert>}
          {isLoading && <Alert variant="info">Loading slots...</Alert>}

          {!showTiles && (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Capacity</th>
                  <th>Booked</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {slots.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No slots available
                    </td>
                  </tr>
                ) : (
                  slots.map((slot) => (
                    <tr key={slot.id}>
                      <td>{slot.startTime} – {slot.endTime}</td>
                      <td>{slot.maxCapacity}</td>
                      <td>{slot.bookedCount}</td>
                      <td>{slot.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}

          {showTiles &&
            (slots.length === 0 ? (
              <p className="text-muted">No slots available</p>
            ) : (
              slots.map((slot) => (
                <Card key={slot.id} className="mb-3 p-3">
                  <h6>
                    {slot.startTime} – {slot.endTime}
                  </h6>

                  <div className="d-flex gap-2 mt-2">
                    {[...Array(slot.maxCapacity)].map((_, i) => (
                      <Badge
                        key={i}
                        className={`p-3 ${
                          i < slot.bookedCount ? "bg-secondary" : "provider-scuess"
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        {i + 1}
                      </Badge>
                    ))}
                  </div>

                  <small className="text-muted mt-2 d-block">
                    Available: {slot.maxCapacity - slot.bookedCount} /{" "}
                    {slot.maxCapacity}
                  </small>
                </Card>
              ))
            ))}
        </Card>
      </Container>
    </>
  );
};

export default ShowSlots;
