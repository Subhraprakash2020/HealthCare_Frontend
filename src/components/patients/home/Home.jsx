import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../../../css/HomePage.css";

const services = [
  {
    icon: "bi-heart-pulse",
    title: "Primary Care",
    text: "Fast access to experienced physicians for routine care, health checks, and chronic condition support.",
  },
  {
    icon: "bi-hospital",
    title: "Specialist Booking",
    text: "Connect with cardiology, pediatrics, dermatology, and more through streamlined appointment scheduling.",
  },
  {
    icon: "bi-shield-check",
    title: "Preventive Health",
    text: "Personalized screenings and wellness plans designed to catch risks early and improve long-term outcomes.",
  },
];

const doctors = [
  {
    name: "Dr. Aisha Rahman",
    specialty: "Cardiology",
    description: "Focused on preventive heart care, hypertension management, and long-term treatment planning.",
  },
  {
    name: "Dr. Daniel Brooks",
    specialty: "Pediatrics",
    description: "Supports child wellness visits, immunizations, and compassionate family-centered care.",
  },
  {
    name: "Dr. Meera Kapoor",
    specialty: "Dermatology",
    description: "Treats common and complex skin concerns with evidence-based care and modern treatment options.",
  },
];

const testimonials = [
  {
    quote:
      "Booking was simple, reminders were timely, and the doctor explained everything clearly. The experience felt calm from start to finish.",
    name: "Sneha Patel",
    detail: "Patient, Mumbai",
  },
  {
    quote:
      "The platform helped me find a specialist quickly. Follow-up care and digital records made the whole process much easier.",
    name: "Rahul Menon",
    detail: "Patient, Bengaluru",
  },
  {
    quote:
      "Clean interface, fast scheduling, and a very professional consultation. It saved me a lot of time compared with calling clinics.",
    name: "Ananya Roy",
    detail: "Patient, Kolkata",
  },
];

function Home() {
  return (
    <div className="healthcare-homepage">
      <Header />

      <main>
        <section className="hero-section">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <div className="hero-copy">
                  <span className="hero-badge">Trusted digital healthcare platform</span>
                  <h1 className="hero-title">
                    Smarter care for every patient, every appointment, every day.
                  </h1>
                  <p className="hero-text">
                    Book appointments, discover expert doctors, and manage care with a
                    modern healthcare experience built for speed, clarity, and trust.
                  </p>
                  <div className="hero-actions">
                    <Button as={Link} to="/patient/signup" className="hero-btn-primary">
                      Get Started
                    </Button>
                    <Button as={Link} to="/patient/signin" className="hero-btn-secondary">
                      Book Appointment
                    </Button>
                  </div>
                  <div className="hero-metrics">
                    <div className="hero-metric-card">
                      <strong>15k+</strong>
                      <span>Appointments managed</span>
                    </div>
                    <div className="hero-metric-card">
                      <strong>120+</strong>
                      <span>Qualified specialists</span>
                    </div>
                    <div className="hero-metric-card">
                      <strong>98%</strong>
                      <span>Patient satisfaction</span>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className="hero-visual">
                  <div className="hero-visual-panel">
                    <div className="hero-floating-card hero-floating-card-top">
                      <i className="bi bi-calendar2-check"></i>
                      <div>
                        <strong>Appointment Confirmed</strong>
                        <span>General consultation at 10:30 AM</span>
                      </div>
                    </div>

                    <div className="hero-visual-main">
                      <div className="hero-main-icon">
                        <i className="bi bi-heart-pulse-fill"></i>
                      </div>
                      <h3>Comprehensive digital care</h3>
                      <p>
                        From first booking to follow-up, manage every healthcare touchpoint
                        in one connected place.
                      </p>
                    </div>

                    <div className="hero-floating-card hero-floating-card-bottom">
                      <i className="bi bi-shield-plus"></i>
                      <div>
                        <strong>Secure records</strong>
                        <span>Protected patient information and streamlined access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section id="services" className="homepage-section services-section">
          <Container>
            <div className="section-heading text-center">
              <span className="section-kicker">Services</span>
              <h2>Healthcare support built around real patient needs</h2>
              <p>
                Access essential services through a clean digital experience designed
                to reduce wait time and improve continuity of care.
              </p>
            </div>
            <Row className="g-4">
              {services.map((service) => (
                <Col md={6} lg={4} key={service.title}>
                  <Card className="homepage-card service-card h-100">
                    <Card.Body>
                      <div className="service-icon">
                        <i className={`bi ${service.icon}`}></i>
                      </div>
                      <h4>{service.title}</h4>
                      <p>{service.text}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section id="doctors" className="homepage-section doctors-section">
          <Container>
            <div className="section-heading text-center">
              <span className="section-kicker">Doctors</span>
              <h2>Meet experienced specialists</h2>
              <p>
                Consult professionals who combine clinical expertise with compassionate
                communication and efficient care delivery.
              </p>
            </div>
            <Row className="g-4">
              {doctors.map((doctor, index) => (
                <Col md={6} lg={4} key={doctor.name}>
                  <Card className="homepage-card doctor-card h-100">
                    <Card.Body>
                      <div className="doctor-avatar">
                        {doctor.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <span className="doctor-index">0{index + 1}</span>
                      <h4>{doctor.name}</h4>
                      <p className="doctor-specialty">{doctor.specialty}</p>
                      <p>{doctor.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section id="testimonials" className="homepage-section testimonials-section">
          <Container>
            <div className="section-heading text-center">
              <span className="section-kicker">Testimonials</span>
              <h2>Patients trust the experience</h2>
              <p>
                Consistent care, transparent communication, and smooth booking make the
                platform easier to rely on.
              </p>
            </div>
            <Row className="g-4">
              {testimonials.map((item) => (
                <Col md={6} lg={4} key={item.name}>
                  <Card className="homepage-card testimonial-card h-100">
                    <Card.Body>
                      <div className="testimonial-quote-mark">“</div>
                      <p>{item.quote}</p>
                      <div className="testimonial-author">
                        <strong>{item.name}</strong>
                        <span>{item.detail}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="homepage-section cta-section">
          <Container>
            <div className="cta-panel">
              <div>
                <span className="section-kicker">Care Starts Here</span>
                <h2>Start your healthcare journey with a faster, cleaner booking experience.</h2>
              </div>
              <Button as={Link} to="/patient/signup" className="hero-btn-primary">
                Create Account
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
