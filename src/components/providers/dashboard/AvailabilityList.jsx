import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AvailabilityList = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async () => {
    const res = await axios.get(
      "http://localhost:8080/healthcare/provider/availability",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAvailabilities(res.data);
  };

  const generateSlots = async (availabilityId) => {
    try {
      await axios.post(
        `http://localhost:8080/healthcare/provider/slot/generate/${availabilityId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Slots generated successfully");
    } catch (err) {
      setMessage(err.response?.data || "Slots already exist");
    }
  };

  return (
    <Container className="mt-5">
      {message && <Alert>{message}</Alert>}

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
          {availabilities.map((a) => (
            <tr key={a.id}>
              <td>{a.date}</td>
              <td>{a.startTime} – {a.endTime}</td>
              <td>{a.slotDuration} min</td>
              <td>{a.capacityPerSlot}</td>
              <td>
                <Button size="sm" onClick={() => generateSlots(a.id)}>
                  Generate Slots
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AvailabilityList;
