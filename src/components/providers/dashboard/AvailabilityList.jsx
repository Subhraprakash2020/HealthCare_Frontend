import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailabilityList = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchAvailabilities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/healthcare/provider/availability",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!cancelled) {
          setAvailabilities(res.data);
        }
      } catch {
        if (!cancelled) {
          setMessage("Failed to load availabilities");
        }
      }
    };

    fetchAvailabilities();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const generateSlots = async (availabilityId) => {
    try {
      await axios.post(
        `http://localhost:8080/healthcare/provider/slot/generate/${availabilityId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/provider/availability/${availabilityId}/slots`);
    } catch (err) {
      if (err.response?.status === 409) {
        navigate(`/provider/availability/${availabilityId}/slots`);
      } else {
        setMessage(err.response?.data || "Slot generation failed");
      }
    }
  };

  return (
    <Container className="mt-5">
      {message && <Alert variant="danger">{message}</Alert>}

      <Table bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Capacity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No availabilities found
              </td>
            </tr>
          ) : (
            availabilities.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td>
                  {a.startTime} – {a.endTime}
                </td>
                <td>{a.slotDuration} min</td>
                <td>{a.capacityPerSlot}</td>
                <td>
                  <Button size="sm" onClick={() => generateSlots(a.id)}>
                    Generate Slots
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AvailabilityList;
