import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "../home/Footer";
import Message from "../../common/Message";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [practices, setPractices] = useState([]);
  const [treatmentLevels, setTreatmentLevels] = useState([]);

  const [selectedPractice, setSelectedPractice] = useState("");
  const [selectedTreatmentLevel, setSelectedTreatmentLevel] = useState("");


  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");

  const[message, setMessage] = useState();

  const navigate = useNavigate();

  useEffect(() =>{
    fetchPractices(),
    fetchTreatmentLevels();

    const msg = sessionStorage.getItem("loginMessage");
    if(msg){
      setMessage(msg);
      sessionStorage.removeItem("loginMessage");
      setTimeout(() => setMessage(null), 3000);
    }
  }, []);

  const fetchPractices = async () =>{
    const res = await fetch("http://localhost:8080/healthcare/provider/options/practices",{
      method: "GET",
      credentials: "include"
    })
    const data = await res.json();
    setPractices(Array.isArray(data) ? data : []);
  }

  const fetchTreatmentLevels = async () => {
    const res = await fetch("http://localhost:8080/healthcare/provider/options/treatment-levels",{
      method: "GET",
      credentials: "include"
    })
    const data = await res.json();
    setTreatmentLevels(data);
  };

  const handleSearch = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
    console.log("user::",user);
    console.log("token::", token);

    if (!token) {
      console.error("No token found. User not logged in.");
      return;
    }

    const payload = {
      clinicianName: searchText1 || null,
      practices: selectedPractice || null,
      levelOfTreatment: selectedTreatmentLevel || null,
      zip: searchText2 || null
    };

    try {
      const res = await fetch(
        "http://localhost:8080/healthcare/provider/search/searchBy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ THIS IS THE KEY
          },
          body: JSON.stringify(payload)
        }
        
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("Search results:", data);

      navigate("/provider-search-results", {
        state: { results: data }
      });

    } catch (err) {
      console.error("Search failed:", err);
    }
  };


  return (
    <div>
      <Header />
      <div className="bg-image-container">
        {message && (
          <Message
            variant="success"
            message={message}
            onClose={() => setMessage(null)}
          />
        )}

        <Container className="custom-my-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label className="text-custom-green">
                  Level of Treatment
                </Form.Label>
                <Form.Select
                  value={selectedTreatmentLevel}
                  onChange={(e) => setSelectedTreatmentLevel(e.target.value)}
                >
                  <option value="">Select Treatment Level</option>
                  {treatmentLevels.map((t, index) => {
                    const value = typeof t === "string" ? t : t.name;
                    const label = typeof t === "string" ? t : t.label || t.name;

                    return (
                      <option key={index} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </Form.Select>

              </Col>

              <Col md={6} className="mb-3">
                <Form.Label className="text-custom-green">
                  Pratices
                </Form.Label>
                <Form.Select 
                  value={selectedPractice}
                  onChange={(e) => setSelectedPractice(e.target.value)}
                >
                  <option value="">Select Practice</option>
                  {practices.map((t, index) =>{
                    const value = typeof t === "string" ? t : t.name;
                    const lebel = typeof t === "string" ? t : t.label || t.name;

                    return(
                      <option key={index} value={value}>
                        {lebel}
                      </option>
                    )
                  })}

                </Form.Select>
              </Col>
            </Row>

            {/* Row 2 – Search Text Fields */}
            <Row className="mt-3">
              <Col md={6} className="mb-3">
                <Form.Label className="text-custom-green">
                  Search By Clinican Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter keyword"
                  value={searchText1}
                  onChange={(e) => setSearchText1(e.target.value)}
                />
              </Col>

              <Col md={6} className="mb-3">
                <Form.Label className="text-custom-green">
                  Search By ZIP
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location / name"
                  value={searchText2}
                  onChange={(e) => setSearchText2(e.target.value)}
                />
              </Col>
            </Row>

            {/* Search Button */}
            <Row>
              <Col className="text-center mt-4">
                <Button className="btn-custom-green px-5" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
            </Row>

          </div>
        </Container>
      </div>
    </div>
  );

}

export default Dashboard;
