import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Table, Alert } from "react-bootstrap";
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
  const [variant, setVariant] = useState("success");
  const [editing, setEditing] = useState(null);

  /* ---------- SAFE ERROR MESSAGE ---------- */
  const getErrorMessage = (err, fallback) => {
    if (typeof err?.response?.data === "string") return err.response.data;
    if (typeof err?.response?.data === "object")
      return err.response.data.message || fallback;
    return fallback;
  };

  /* ---------- LOAD AVAILABILITIES (EFFECT-SAFE) ---------- */
  useEffect(() => {
    let cancelled = false;

    const fetchAvailabilities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/healthcare/provider/availability/next",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!cancelled) {
          setAvailabilities(res.data);
        }
      } catch {
        if (!cancelled) {
          setVariant("danger");
          setMessage("Failed to load availabilities");
        }
      }
    };

    fetchAvailabilities();

    return () => {
      cancelled = true;
    };
  }, [token]);

  /* ---------- FORM HANDLING ---------- */
  const handleChange = (e) => {
    if (editing) setEditing(null);
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

  /* ---------- ADD / UPDATE ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.startTime >= form.endTime) {
      setVariant("danger");
      setMessage("End time must be after start time");
      return;
    }

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8080/healthcare/provider/availability/${editing}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVariant("success");
        setMessage("Availability updated successfully");
      } else {
        await axios.post(
          "http://localhost:8080/healthcare/provider/availability/add",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVariant("success");
        setMessage(
          "Availability added successfully. Only future availabilities are shown."
        );
      }

      resetForm();

      // reload list
      const res = await axios.get(
        "http://localhost:8080/healthcare/provider/availability/next",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailabilities(res.data);
    } catch (err) {
      setVariant("danger");
      setMessage(
        getErrorMessage(err, "Availability overlaps with existing availability")
      );
    }
  };

  /* ---------- GENERATE SLOTS ---------- */
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
        navigate(`/provider/availability/${id}/slots`);
      } else {
        setVariant("danger");
        setMessage("Failed to generate slots");
      }
    }
  };

  /* ---------- DELETE ---------- */
  const deleteAvailability = async (id) => {
    if (!window.confirm("Are you sure you want to delete this availability?"))
      return;

    try {
      await axios.delete(
        `http://localhost:8080/healthcare/provider/availability/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVariant("success");
      setMessage("Availability deleted successfully");

      const res = await axios.get(
        "http://localhost:8080/healthcare/provider/availability/next",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailabilities(res.data);
    } catch (err) {
      setVariant("danger");
      setMessage(getErrorMessage(err, "Cannot delete availability"));
    }
  };

  /* ---------- EDIT ---------- */
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

  /* ---------- UI ---------- */
  return (
    <>
      <ProviderHeader />

      <Container className="mt-4">
        {/* FORM */}
        <Card className="p-4 mb-4 shadow-sm">
          <h4>{editing ? "Update Availability" : "Create Availability"}</h4>

          {message && <Alert variant={variant}>{message}</Alert>}

          <Form onSubmit={handleSubmit} className="row g-2">
            <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
            <Form.Control type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
            <Form.Control type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
            <Form.Control type="number" name="slotDuration" placeholder="Slot Duration (minutes)" value={form.slotDuration} onChange={handleChange} required />
            <Form.Control type="number" name="capacityPerSlot" placeholder="Capacity per slot" value={form.capacityPerSlot} onChange={handleChange} required />

            <div className="d-flex gap-2">
              <Button type="submit">{editing ? "Update" : "Add"}</Button>
              {editing && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card>

        {/* TABLE */}
        <Card className="p-3 shadow-sm">
          <h5>My Availabilities (Upcoming)</h5>

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
              {availabilities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No future availabilities found
                  </td>
                </tr>
              ) : (
                availabilities.map((a) => (
                  <tr key={a.id}>
                    <td>{a.date}</td>
                    <td>{a.startTime} – {a.endTime}</td>
                    <td>{a.slotDuration} min</td>
                    <td>{a.capacityPerSlot}</td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        disabled={a.slotGeneratedStatus}
                        onClick={() => generateSlots(a.id)}
                      >
                        {a.slotGeneratedStatus ? "Slots Generated" : "Generate Slots"}
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => startEdit(a)}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteAvailability(a.id)}
                      >
                        Delete
                      </Button>
                    </td>
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

export default CreateAvailability;
