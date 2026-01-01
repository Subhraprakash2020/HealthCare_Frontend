import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table, Alert } from "react-bootstrap";
import axios from "axios";

const ProviderAvailabilityList = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    const res = await axios.get(
      "http://localhost:8080/healthcare/provider/availability",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
      setMessage(err.response?.data || "Error generating slots");
    }
  };

  const deleteSlots = async (availabilityId) => {
    await axios.delete(
      `http://localhost:8080/healthcare/provider/slot/delete/${availabilityId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessage("Slots deleted");
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h4>My Availabilities</h4>

        {message && <Alert>{message}</Alert>}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Slot Duration</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {availabilities.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td>
                  {a.startTime} - {a.endTime}
                </td>
                <td>{a.slotDuration} min</td>
                <td>{a.capacityPerSlot}</td>
                <td>
                  <Button
                    size="sm"
                    className="me-2"
                    onClick={() => generateSlots(a.id)}
                  >
                    Generate Slots
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteSlots(a.id)}
                  >
                    Delete Slots
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default ProviderAvailabilityList;
