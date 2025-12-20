import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner , Button} from "react-bootstrap";
import Header from "./Header";;
import { Link } from 'react-router-dom';

function PatientProfile(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() =>{
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
    try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("User not logged in");

        const { id, accessToken } = JSON.parse(storedUser);

        const response = await fetch(
        `http://localhost:8080/healthcare/patient/profile/${id}`,
        {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }
        );

        if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch profile");
        }

        const result = await response.json();
        setData(result);
    } catch (error) {
        console.error("Profile fetch error:", error.message);
    } finally {
        setLoading(false);
    }
    };


    if (loading) {
        return (
        <>
            <Header />
            <Container className="text-center mt-5">
            <Spinner animation="border" />
            </Container>
        </>
        );
    }

    if (!data) {
        return (
        <>
            <Header />
            <Container className="text-center mt-5">
            <h5>Profile not found</h5>
            </Container>
        </>
        );
    }

  const { patient, patientProfileImage } = data;

    return(
        <>
          <Header />

        <Container className="mt-5 mb-5 d-flex justify-content-center">
        <Card className="w-100 shadow-sm" style={{ maxWidth: "900px" }}>
            <Card.Body className="text-center p-4">

            {/* Profile Image */}
            <div className="d-flex justify-content-center mb-3">
                <img
                src={
                    patientProfileImage?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="profile-avatar-info"
                />
            </div>

            <h4 className="fw-semibold text-primary mb-4">
                {patient.firstName} {patient.lastName}
            </h4>

            {/* Info Section */}
            <div className="text-center">

                <hr className="w-75 mx-auto opacity-25" />

                <p className="mb-2">
                <strong>Email:</strong> {patient.email}
                </p>
                <p className="mb-2">
                <strong>Phone:</strong> {patient.phoneNumber}
                </p>
                <p className="mb-2">
                <strong>Address:</strong> {patient.address}
                </p>

                <hr className="w-75 mx-auto opacity-25" />

                <p className="mb-0">
                <strong>Position:</strong>{" "}
                {patient.role || "—"}
                </p>

            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">

                <Button className="btn-custom-green">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Profile
                </Button>

                <Button as={Link} to='/patient/dashboard' className="btn-custom-green">
                <i className="bi bi-search me-2"></i>
                Start Searching providers
                </Button>

            </div>

            </Card.Body>
        </Card>
        </Container>


        </>
    )
}

export default PatientProfile;