import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ProviderHeader from "./ProviderHeader";

function ProviderAppointmentsList() {
  const token = localStorage.getItem("token");

  const getToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getToday());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async (date, signal) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/healthcare/providers/booking/patients?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        }
      );

      if (!signal.aborted) {
        setAppointments(res.data || []);
      }
    } catch {
      if (!signal.aborted) {
        setAppointments([]);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    const controller = new AbortController();

    fetchAppointments(selectedDate, controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchAppointments, selectedDate]);

  return (
    <div className="provider-dashboard-page">
      <ProviderHeader />

      <Container fluid="xl" className="py-4">
        <Row className="g-4">
          <Col xl={12}>
            <Card className="provider-dashboard-card border-0 shadow-sm">
              <Card.Body className="p-4 p-lg-5">
                <Row className="align-items-center g-3">
                  <Col lg={8}>
                    <p className="provider-dashboard-kicker mb-2">Appointments</p>
                    <h2 className="provider-dashboard-heading mb-2">
                      Provider booking list
                    </h2>
                    <p className="provider-dashboard-muted mb-0">
                      Review every booked patient for the selected day and switch dates without leaving the provider workspace.
                    </p>
                  </Col>
                  <Col lg={4} className="text-lg-end">
                    <Badge className="provider-status-badge provider-status-confirmed me-2">
                      {appointments.length} bookings
                    </Badge>
                    <Button
                      as={Link}
                      to="/provider/dashboard"
                      className="provider-dashboard-outline-btn"
                    >
                      Back to Dashboard
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={12}>
            <Card className="provider-dashboard-card border-0 shadow-sm">
              <Card.Body className="p-0">
                <div className="provider-dashboard-table-header">
                  <div>
                    <h5 className="mb-1">All Appointments</h5>
                    <p className="provider-dashboard-muted mb-0">
                      Filter the provider booking list by date.
                    </p>
                  </div>
                  <Form.Group className="mb-0" style={{ minWidth: "220px" }}>
                    <Form.Control
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setLoading(true);
                        setSelectedDate(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>

                <div className="table-responsive">
                  <Table hover className="align-middle mb-0 provider-dashboard-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            Loading...
                          </td>
                        </tr>
                      ) : appointments.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            No Appointments Found
                          </td>
                        </tr>
                      ) : (
                        appointments.map((item) => (
                          <tr key={item.bookingId}>
                            <td className="fw-semibold text-dark">{item.patientName}</td>
                            <td>{item.bookingTime}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.gender}</td>
                            <td>{item.age}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.bookingDate}</td>
                            <td>
                              <Button size="sm" className="provider-dashboard-outline-btn">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProviderAppointmentsList;
