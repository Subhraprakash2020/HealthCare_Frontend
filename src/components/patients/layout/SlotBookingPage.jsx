import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import "../../../css/custom.css";

const get7DaysFrom = (startDate) => {
  const days = [];
  const base = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);

    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      iso: d.toISOString().split("T")[0],
    });
  }
  return days;
};

function SlotBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get("providerId");

  const todayIso = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayIso);
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const monthYear = new Date(startDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const fetchSlots = useCallback(
    async (availId, date, token) => {
      const res = await axios.get(
        `http://localhost:8080/healthcare/patient/booking/slot/${availId}`,
        {
          params: { providerId, date },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSlots(res.data || []);
    },
    [providerId]
  );

  const fetchAvailabilityByDate = useCallback(
    async (date) => {
      try {
        setLoading(true);
        setSlots([]);

        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          alert("Please login again");
          return;
        }

        const { accessToken } = JSON.parse(storedUser);

        const res = await axios.get(
          `http://localhost:8080/healthcare/patient/booking/availability/${providerId}`,
          {
            params: { date },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!res.data || res.data.length === 0) {
          return;
        }

        const availId = res.data[0].id;

        navigate(
          `/patient/slot/${availId}?providerId=${providerId}&date=${date}`,
          { replace: true }
        );

        await fetchSlots(availId, date, accessToken);
      } catch (err) {
        console.error(err);
        alert("Unable to load availability");
      } finally {
        setLoading(false);
      }
    },
    [providerId, navigate, fetchSlots]
  );


  useEffect(() => {
    if (providerId) {
      fetchAvailabilityByDate(selectedDate);
    }
  }, [providerId, selectedDate, fetchAvailabilityByDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAvailabilityByDate(date);
  };

  const goToPrevious = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() - 1);
    setStartDate(d.toISOString().split("T")[0]);
  };

  const goToNext = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 1);
    setStartDate(d.toISOString().split("T")[0]);
  };

  const handleSlotBooking = (slot) => {
    navigate(
      `/patient/confirm-booking?slotId=${slot.id}&providerId=${providerId}&date=${selectedDate}`
    );
  };

  const formatTime = (time) => (time ? time.substring(0, 5) : "");

  return (
    <>
      <Header />

      <div className="container mt-4">
        <div className="mb-3">
          <h6 className="mb-0">{monthYear}</h6>
        </div>

        <div className="d-flex align-items-center mb-4">
          <div className="d-flex flex-nowrap overflow-auto flex-grow-1">
            <Button
              size="sm"
              variant="outline-secondary"
              className="me-2"
              onClick={goToPrevious}
            >
              ◀
            </Button>
            {get7DaysFrom(startDate).map((d) => (
              <div
                key={d.iso}
                className={`text-center px-3 py-2 mx-1 rounded border ${
                  selectedDate === d.iso
                    ? "bg-primary-green text-white"
                    : "border-secondary"
                }`}
                style={{ minWidth: "70px", cursor: "pointer" }}
                onClick={() => handleDateClick(d.iso)}
              >
                <div className="small fw-semibold">{d.label}</div>
                <div className="fw-bold">{d.day}</div>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline-secondary"
              className="ms-2"
              onClick={goToNext}
            >
              ▶
            </Button>
          </div>
        </div>

        <h5 className="mb-3">Available Slots</h5>

        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        )}

        {!loading && slots.length === 0 && (
          <p className="text-muted">No slots available</p>
        )}

        {!loading && slots.length > 0 && (
          <div className="mt-3">
            {slots.map((slot) => (
              <div key={slot.id} className="mb-4">
                <div className="fw-semibold mb-2">
                  {formatTime(slot.startTime)} –{" "}
                  {formatTime(slot.endTime)}
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {Array.from({ length: slot.maxCapacity }).map((_, index) => {
                    const isBooked = index < slot.bookedCount;

                    return (
                      <div
                        key={index}
                        className={`slot-box border rounded ${
                          isBooked
                            ? "bg-secondary"
                            : "bg-white border-primary"
                        }`}
                        onClick={() => {
                          if (!isBooked) handleSlotBooking(slot);
                        }}
                        role="button"
                        aria-disabled={isBooked}
                      />
                    );
                  })}
                </div>

                <div className="small text-muted mt-1">
                  Available: {slot.maxCapacity - slot.bookedCount} /{" "}
                  {slot.maxCapacity}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SlotBookingPage;
