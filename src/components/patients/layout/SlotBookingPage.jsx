import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Spinner, Badge } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";

const getNext7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      iso: d.toISOString().split("T")[0],
    });
  }
  return days;
};

const SlotBookingPage = () => {
  const navigate = useNavigate();
  const { availabilityId: urlAvailabilityId } = useParams();
  const [searchParams] = useSearchParams();

  const providerId = searchParams.get("providerId");

  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") ||
      new Date().toISOString().split("T")[0]
  );
  const [availabilityId, setAvailabilityId] = useState(urlAvailabilityId);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (providerId) {
      fetchAvailabilityByDate(selectedDate);
    }
  }, [providerId]);

  const fetchAvailabilityByDate = async (date) => {
    try {
      setLoading(true);
      setSlots([]);

      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please login again");
        return;
      }

      const { accessToken } = JSON.parse(storedUser);

      const response = await axios.get(
        `http://localhost:8080/healthcare/patient/booking/availability/${providerId}`,
        {
          params: { date },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data || response.data.length === 0) {
        setAvailabilityId(null);
        setSlots([]);
        return;
      }

      const newAvailabilityId = response.data[0].id;
      setAvailabilityId(newAvailabilityId);

      navigate(
        `/patient/slot/${newAvailabilityId}?providerId=${providerId}&date=${date}`,
        { replace: true }
      );

      await fetchSlots(newAvailabilityId, date, accessToken);
    } catch (err) {
      console.error("Error fetching availability", err);
      alert("Unable to load availability");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (availId, date, token) => {
    const res = await axios.get(
      `http://localhost:8080/healthcare/patient/booking/slot/${availId}`,
      {
        params: { providerId, date },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSlots(res.data || []);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAvailabilityByDate(date);
  };

  const formatTime = (time) => (time ? time.substring(0, 5) : "");

  return (
    <>
      <Header />

      <div className="container mt-4">
        <div className="d-flex overflow-auto mb-4">
          {getNext7Days().map((d) => (
            <div
              key={d.iso}
              className={`text-center px-3 py-2 mx-1 rounded border ${
                selectedDate === d.iso
                  ? "border-primary bg-primary text-white"
                  : "border-secondary"
              }`}
              style={{ cursor: "pointer", minWidth: "70px" }}
              onClick={() => handleDateClick(d.iso)}
            >
              <div className="small fw-semibold">{d.label}</div>
              <div className="fw-bold">{d.day}</div>
            </div>
          ))}
        </div>

        <h5 className="mb-3">Available Slots</h5>

        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        )}

        {!loading && slots.length === 0 && (
          <p className="text-muted">No slots available for this date</p>
        )}

        {!loading &&
          slots.map((slot) => (
            <Card key={slot.id} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">
                    {formatTime(slot.startTime)} –{" "}
                    {formatTime(slot.endTime)}
                  </h6>
                  <small className="text-muted">
                    Capacity: {slot.bookedCount}/{slot.maxCapacity}
                  </small>
                </div>

                <div className="text-end">
                  {slot.status === "AVAILABLE" ? (
                    <>
                      <Badge bg="success" className="mb-2">
                        Available
                      </Badge>
                      <br />
                      <Button size="sm">Book</Button>
                    </>
                  ) : (
                    <Badge bg="danger">Full</Badge>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
};

export default SlotBookingPage;
