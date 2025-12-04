import React from 'react';
import Header from './Header'
import Footer from './Footer';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={9}>
            <div className="p-4 shadow-lg rounded-3 bg-white">
              <h2 className="text-center mb-4">Sign Up</h2>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label className="text-custom-green">FirstName</Form.Label>
                  <Form.Control type="firstName" placeholder="Enter First Name" className="input-bg" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label className="text-custom-green">LastName</Form.Label>
                  <Form.Control type="lastName" placeholder="Enter Last Name" className="input-bg"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasiAge">
                  <Form.Label className="text-custom-green">Age</Form.Label>
                  <Form.Control type="age" placeholder="Enter Age" className="input-bg"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label className="text-custom-green">Gender</Form.Label>
                  <Form.Select aria-label="Select your gender" className="input-bg">
                    <option>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasiPhone">
                  <Form.Label className="text-custom-green">Phone</Form.Label>
                  <Form.Control type="phone" placeholder="Enter Phone Number" className="input-bg"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-custom-green">Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" className="input-bg"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label className="text-custom-green">Address</Form.Label>
                  <Form.Control type="address" placeholder="Enter Address" className="input-bg"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-custom-green">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" className="input-bg"/>
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