import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminSignIn(){
   return(
     <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign In</h2>
              <form action="/healthcare/admin/signin" method="POST">
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" class="form-control" id="email" name="email" required/>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" name="password" required/>
                </div>
                <div className="d-grid">
                  <button type="submit" class="btn btn-primary">Sign In</button>
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
