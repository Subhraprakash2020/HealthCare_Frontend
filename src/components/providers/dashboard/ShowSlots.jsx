import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Button, Table, Alert } from "react-bootstrap";
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

  // Memoize dates array so it doesn't recreate on every render
  const dates = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  }, []);

  // Initialize state with proper initial values
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState(
    providerId ? "" : "Provider not logged in"
  );
  const [isLoading, setIsLoading] = useState(false);

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

  // Load initial slots only when component mounts and providerId exists
  useEffect(() => {
    if (providerId && dates[0]) {
      loadSlots(dates[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

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
                className={date === selectedDate ? "btn-custom-primary" : "btn-custom-outline"}
                onClick={() => loadSlots(date)}
                disabled={!providerId}
              >
                {date}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-3 shadow-sm">
          <h5>Slots for {selectedDate}</h5>

          {message && <Alert variant="danger">{message}</Alert>}

          {isLoading && (
            <Alert variant="info">Loading slots...</Alert>
          )}

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
        </Card>
      </Container>
    </>
  );
};

export default ShowSlots;