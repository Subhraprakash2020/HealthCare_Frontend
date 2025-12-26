import React from "react";

function AdminSignIn() {
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="col-12 col-sm-7 col-md-5 col-lg-3">
        <div className="card shadow border-0">
          <div className="card-body px-4 py-5">
            
            <h2 className="text-center fw-bold mb-2">Sign In</h2>

            <p className="text-center text-muted mb-4 text-nowrap">
              Enter your credentials to access your account
            </p>

            <form action="/healthcare/admin/signin" method="POST">
              
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control border-2"
                  name="email"
                  placeholder="Email Address"
                  required
                />
              </div>

              
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control border-2"
                  name="password"
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
