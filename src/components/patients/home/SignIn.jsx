import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Message from '../../common/Message';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
function SignIn() {
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const respone = await fetch("http://localhost:8080/healthcare/patient/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let result = null;
      try {
        result = await respone.json();
      } catch {
        result = { message: "Invalid email or password!" };
      }

      if(respone.ok){
        localStorage.setItem("token", result.accessToken || "");
        localStorage.setItem("user", JSON.stringify(result));
        sessionStorage.setItem("loginMessage", "Login successful!");
        navigate("/patient/dashboard");
      }
      else{
        setVariant("danger");
        setMessage(result.message || "Invalid email or password!");
        setTimeout(() => setMessage(null), 3000);
      }

    }
    catch{
      sessionStorage.setItem("loginMessage", "Login successful!");
      setVariant("danger");
      setMessage("Something went wrong!");

      setTimeout(() => setMessage(null), 3000);
    }
  }
  return (
    <>
      <Header />
      {message && (
        <Message
          variant={variant}
          message={message}
          onClose={() => setMessage(null)}
        />
      )}

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={9}>
            <div className="p-4 shadow-lg rounded-3 bg-white">
              <h2 className="text-center mb-4">Sign In</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-custom-green">Email</Form.Label>
                  <Form.Control type="email" name= "email" placeholder="Enter email" className="input-bg" value={formData.email}
                    onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-custom-green">Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Password" className="input-bg" value={formData.password}
                    onChange={handleChange}
                    required/>
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
      ]    </>
  );
}

export default SignIn;
