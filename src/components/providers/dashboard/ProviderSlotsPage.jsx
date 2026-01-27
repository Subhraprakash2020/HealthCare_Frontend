import React, { useEffect, useState } from "react";
import { Container, Card, Badge } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProviderHeader from "./ProviderHeader";

const ProviderSlotsPage = () => {
  const { availabilityId } = useParams();
  const token = localStorage.getItem("token");

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/healthcare/provider/slot/${availabilityId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!cancelled) {
          setSlots(res.data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Slot fetch error:", err.response || err);
        }
      }
    };

    if (availabilityId) {
      fetchSlots();
    }

    return () => {
      cancelled = true;
    };
  }, [availabilityId, token]);

  return (
    <>
      <ProviderHeader />

      <Container className="mt-4">
        <h4 className="mb-4">Available Slots</h4>

        {slots.length === 0 ? (
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
                    bg={i < slot.bookedCount ? "secondary" : "success"}
                    className="p-3"
                    style={{ cursor: "pointer" }}
                  >
                    {i + 1}
                  </Badge>
                ))}
              </div>

              <small className="text-muted mt-2">
                Available: {slot.maxCapacity - slot.bookedCount} /{" "}
                {slot.maxCapacity}
              </small>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default ProviderSlotsPage;
