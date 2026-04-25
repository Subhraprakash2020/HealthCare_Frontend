import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ProviderHeader from "./ProviderHeader";

const summaryCards = [
  {
    title: "Today's Appointments",
    value: "18",
    detail: "4 arriving in the next hour",
    icon: "bi-calendar2-check",
  },
  {
    title: "Pending Requests",
    value: "6",
    detail: "2 need urgent confirmation",
    icon: "bi-hourglass-split",
  },
  {
    title: "Total Patients",
    value: "248",
    detail: "12 new this month",
    icon: "bi-people",
  },
];

const quickActions = [
  {
    label: "Add Availability",
    to: "/provider/create-availability",
    icon: "bi-plus-circle",
  },
  {
    label: "View Schedule",
    to: "/provider/show-slot",
    icon: "bi-calendar3",
  },
  {
    label: "Messages",
    to: "/provider/dashboard",
    icon: "bi-chat-dots",
  },
];

const appointments = [
  {
    id: 1,
    patientName: "Sneha Patel",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Rahul Verma",
    time: "10:15 AM",
    type: "Consultation",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Ananya Roy",
    time: "11:30 AM",
    type: "Routine Check",
    status: "Confirmed",
  },
  {
    id: 4,
    patientName: "Karan Mehta",
    time: "01:00 PM",
    type: "Video Visit",
    status: "Completed",
  },
  {
    id: 5,
    patientName: "Priya Singh",
    time: "03:15 PM",
    type: "New Patient",
    status: "Confirmed",
  },
];

const navigationItems = [
  { label: "Dashboard", icon: "bi-grid-1x2", active: true },
  { label: "Appointments", icon: "bi-journal-medical", active: false },
  { label: "Patients", icon: "bi-person-lines-fill", active: false },
  { label: "Reports", icon: "bi-bar-chart", active: false },
];

function SummaryCard({ title, value, detail, icon }) {
  return (
    <Card className="provider-dashboard-card provider-summary-card border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <p className="provider-dashboard-label mb-2">{title}</p>
            <h3 className="provider-dashboard-value mb-2">{value}</h3>
            <p className="provider-dashboard-muted mb-0">{detail}</p>
          </div>
          <div className="provider-summary-icon">
            <i className={`bi ${icon}`}></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function StatusBadge({ status }) {
  const statusClass =
    status === "Confirmed"
      ? "provider-status-confirmed"
      : status === "Pending"
        ? "provider-status-pending"
        : "provider-status-completed";

  return <Badge className={`provider-status-badge ${statusClass}`}>{status}</Badge>;
}

function ProviderDashboard() {
  return (
    <div className="provider-dashboard-page">
      <ProviderHeader />

      <Container fluid="xl" className="py-4">
        <Row className="g-4">
          <Col xl={3} className="d-none d-xl-block">
            <Card className="provider-dashboard-card border-0 shadow-sm">
              <Card.Body className="p-3">
                <div className="provider-dashboard-sidebar-header">
                  <p className="mb-1">Provider Panel</p>
                  <h5 className="mb-0">Care Workspace</h5>
                </div>
                <Nav className="flex-column gap-2 mt-3">
                  {navigationItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className={`provider-sidebar-link ${item.active ? "active" : ""}`}
                    >
                      <i className={`bi ${item.icon}`}></i>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={9}>
            <Card className="provider-dashboard-card border-0 shadow-sm mb-4">
              <Card.Body className="p-4 p-lg-5">
                <Row className="align-items-center g-3">
                  <Col lg={8}>
                    <p className="provider-dashboard-kicker mb-2">Welcome back</p>
                    <h2 className="provider-dashboard-heading mb-2">
                      Here’s a quick look at today’s care schedule.
                    </h2>
                    <p className="provider-dashboard-muted mb-0">
                      Track appointments, manage requests, and update availability from one clean dashboard.
                    </p>
                  </Col>
                  <Col lg={4} className="text-lg-end">
                    <Button as={Link} to="/provider/create-availability" className="provider-dashboard-primary-btn">
                      Add Availability
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Row className="g-4 mb-4">
              {summaryCards.map((card) => (
                <Col md={6} xl={4} key={card.title}>
                  <SummaryCard {...card} />
                </Col>
              ))}
            </Row>

            <Row className="g-4">
              <Col lg={8}>
                <Card className="provider-dashboard-card border-0 shadow-sm">
                  <Card.Body className="p-0">
                    <div className="provider-dashboard-table-header">
                      <div>
                        <h5 className="mb-1">Today's Appointments</h5>
                        <p className="provider-dashboard-muted mb-0">
                          Manage today’s patient schedule in one place.
                        </p>
                      </div>
                      <Button className="provider-dashboard-primary-btn provider-dashboard-export-btn">
                        Export List
                      </Button>
                    </div>

                    <div className="table-responsive">
                      <Table hover className="align-middle mb-0 provider-dashboard-table">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                              <td className="fw-semibold text-dark">{appointment.patientName}</td>
                              <td>{appointment.time}</td>
                              <td>{appointment.type}</td>
                              <td>
                                <StatusBadge status={appointment.status} />
                              </td>
                              <td>
                                <div className="d-flex flex-wrap gap-2">
                                  <Button size="sm" className="provider-dashboard-outline-btn">
                                    View
                                  </Button>
                                  <Button size="sm" className="provider-dashboard-outline-btn">
                                    Reschedule
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="provider-dashboard-card border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <h5 className="mb-1">Quick Actions</h5>
                    <p className="provider-dashboard-muted mb-4">
                      Frequently used tools for your day.
                    </p>

                    <div className="d-grid gap-3">
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          as={Link}
                          to={action.to}
                          className="provider-quick-action-btn"
                        >
                          <span className="provider-quick-action-icon">
                            <i className={`bi ${action.icon}`}></i>
                          </span>
                          <span>{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProviderDashboard;
