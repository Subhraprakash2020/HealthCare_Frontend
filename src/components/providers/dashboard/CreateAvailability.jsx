import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Table, Alert, Modal } from "react-bootstrap";
import axios from "axios";
import ProviderHeader from "./ProviderHeader";
import { useNavigate } from "react-router-dom";

const CreateAvailability = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    slotDuration: "",
    capacityPerSlot: "",
  });

  const [availabilities, setAvailabilities] = useState([]);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async (selectedDate = "") => {
    try {
      const res = await axios.get(
        "http://localhost:8080/healthcare/provider/availability/next",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: selectedDate ? { date: selectedDate } : {},
        }
      );
      setAvailabilities(res.data);
    } catch (err) {
      console.error("Availability API error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
        setMessage(err.response.data?.message || "Server error");
      } else {
        setMessage("Network error or server not reachable");
      }
    }
  };
  
  useEffect(() => {
    loadAvailabilities();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      date: "",
      startTime: "",
      endTime: "",
      slotDuration: "",
      capacityPerSlot: "",
    });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:8080/healthcare/provider/availability/${editing}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Availability updated successfully");
      } else {
        await axios.post(
          "http://localhost:8080/healthcare/provider/availability/add",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Availability added successfully");
      }

      resetForm();
      loadAvailabilities();
    } catch (err) {
      setMessage(err.response?.data || "Operation failed");
    }
  };

  const generateSlots = async (id) => {
    try {
      await axios.post(
        `http://localhost:8080/healthcare/provider/slot/generate/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/provider/availability/${id}/slots`);

    } catch (err) {
      if (err.response?.status === 409) {
        // slots already exist → still redirect
        navigate(`/provider/availability/${id}/slots`);
      } else {
        setMessage(err.response?.data || "Slots already exist");
      }
    }
  };


  const deleteAvailability = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/healthcare/provider/availability/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Availability deleted");
      loadAvailabilities();
    } catch (err) {
      setMessage(err.response?.data || "Cannot delete availability");
    }
  };

  const startEdit = (a) => {
    setEditing(a.id);
    setForm({
      date: a.date,
      startTime: a.startTime,
      endTime: a.endTime,
      slotDuration: a.slotDuration,
      capacityPerSlot: a.capacityPerSlot,
    });
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <ProviderHeader/>
      <Container className="mt-4">
        <Card className="p-4 mb-4 shadow-sm">
          <h4>{editing ? "Update Availability" : "Create Availability"}</h4>

          {message && <Alert>{message}</Alert>}

          <Form onSubmit={handleSubmit} className="row g-2">
            <h5>Date</h5>
            <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
            <h5>Start Time</h5>
            <Form.Control type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
            <h5>End Time</h5>
            <Form.Control type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
            <h5>Slot Duration</h5>
            <Form.Control type="number" name="slotDuration" value={form.slotDuration} onChange={handleChange} required />
            <h5>Capacity Per Slot</h5>
            <Form.Control type="number" name="capacityPerSlot" value={form.capacityPerSlot} onChange={handleChange} required />

            <div className="d-flex gap-2">
              <Button type="submit">
                {editing ? "Update" : "Add"}
              </Button>
              {editing && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card>

        {/* ---------------- TABLE ---------------- */}
        <Card className="p-3 shadow-sm">
          <h5>My Availabilities</h5>

          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Capacity</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {availabilities.map((a) => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.startTime} – {a.endTime}</td>
                  <td>{a.slotDuration} min</td>
                  <td>{a.capacityPerSlot}</td>
                  <td className="text-center">
                    <Button size="sm" className="me-2" onClick={() => generateSlots(a.id)}>
                      Generate Slots
                    </Button>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => startEdit(a)}>
                      Update
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => deleteAvailability(a.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default CreateAvailability;
