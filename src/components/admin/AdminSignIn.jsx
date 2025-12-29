import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../../css/custom.css";


function AdminSignIn() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(
        "http://localhost:8080/healthcare/admin/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const token = await response.text();
      localStorage.setItem("adminToken", token.replace("JWT: ", ""));

      navigate("/healthcare/admin/AdminDashboard");

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center admin-signin-bg">
      <div className="col-12 col-sm-7 col-md-5 col-lg-3 position-relative">
        {errorMsg && (
          <div className="alert alert-danger py-2 text-center">
            {errorMsg}
          </div>
        )}
        <div className="card shadow border-0 position-relative z-2">
          <div className="card-body px-4 py-5">
            
            <h2 className="text-center fw-bold mb-2">Sign In</h2>

            <p className="text-center text-muted mb-4 text-nowrap">
              Enter your credentials to access your account
            </p>

            {/* {errorMsg && (
              <div className="alert alert-danger py-2 text-center">
                {errorMsg}
              </div>
            )} */}

            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control border-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                />
              </div>

              
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control border-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="d-flex justify-content-end mb-4">
                <a href="#" className="text-primary text-decoration-none">
                  Forgot password?
                </a>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
