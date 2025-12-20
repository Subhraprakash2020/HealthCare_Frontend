import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


function AdminSignIn(){
  return(
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign In</h2>
              <form action="/healthcare/admin/signin" method="POST">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" name="email" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" required/>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
              </form>
            </div>
          </div>  
        </div>
      </div>
    </>
  )
}

export default AdminSignIn;
