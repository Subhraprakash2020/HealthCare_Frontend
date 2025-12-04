import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function SignIn() {
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={9}>
            <div className="p-4 shadow-lg rounded-3 bg-white">
              <h2 className="text-center mb-4">Sign In</h2>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-custom-green">Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" className="input-bg"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-custom-green">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" className="input-bg" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" className="text-custom-green"  />
                </Form.Group>


                <div className="mt-3">
                  <Button variant="success" type="submit" className="rounded-2 shadow-sm w-20 mx-auto btn-custom-green">
                    Log In
                  </Button>
                </div>
              </Form>

              <div className="mt-3">
                <Link to="/signup" className="text-decoration-none me-4 text-custom-green">
                  SIGN UP
                </Link>
                <Link to="/reset-password" className="text-decoration-none text-custom-green">
                  RESET PASSWORD
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default SignIn;
