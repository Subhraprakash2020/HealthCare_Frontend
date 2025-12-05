import React, { useState } from 'react';
import Header from './Header'
import Footer from './Footer';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
      const respone = await fetch("http://localhost:8080/healthcare/patient/signup",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const result = await respone.json();

      if(respone.ok){
        navigate("/patient/dsahboard");
      }
      else{
        alert(result.message || "Signup failed!");
      }
    }
    catch (error){
      console.error("Signup error:", error);
      alert("Some went wrong!");
    }
  }
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={9}>
            <div className="p-4 shadow-lg rounded-3 bg-white">
              <h2 className="text-center mb-4">Sign Up</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label className="text-custom-green">FirstName</Form.Label>
                  <Form.Control name ="firstName" placeholder="Enter First Name" className="input-bg" value={formData.firstName} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label className="text-custom-green">LastName</Form.Label>
                  <Form.Control name ="lastName" placeholder="Enter Last Name" className="input-bg" value={formData.lastName} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasiAge">
                  <Form.Label className="text-custom-green">Age</Form.Label>
                  <Form.Control name="age" placeholder="Enter Age" className="input-bg" value={formData.age} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-custom-green">Gender</Form.Label>
                  <Form.Select name="gender" className="input-bg" value={formData.gender} onChange={handleChange}required>
                    <option value="">Select your gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasiPhone">
                  <Form.Label className="text-custom-green">Phone</Form.Label>
                  <Form.Control name="phoneNumber" placeholder="Enter Phone Number" className="input-bg" value={formData.phoneNumber} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-custom-green">Email</Form.Label>
                  <Form.Control name="email" placeholder="Enter email" className="input-bg" value={formData.email} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label className="text-custom-green">Address</Form.Label>
                  <Form.Control name="address" placeholder="Enter Address" className="input-bg" value={formData.address} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-custom-green">Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" className="input-bg" value={formData.password} onChange={handleChange} required/>
                </Form.Group>


                <div className="mt-3">
                  <Button variant="success" type="submit" className="rounded-2 shadow-sm w-20 mx-auto btn-custom-green">
                    Sign Up
                  </Button>
                </div>
              </Form>
              <div className="mt-3">
                <Link to="/signin" className="text-decoration-none me-4 text-custom-green">
                  Already have an account?
                </Link>
              </div>      
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;