import React, { useState } from "react";
import "../../../css/ProviderAuth.css";

const ProviderSignup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clinicAddress: "",
    gender: "",
    password: "",
  });

  return (
    <div className="provider-form-page">
      <div className="provider-form-card">

        {/* HEADER */}
        <div className="form-header">
          <h1>
            MEDICAL <span>FORM</span>
          </h1>
          <div className="hospital-badge">
            <span>St. Mary</span>
            <small>Hospital</small>
          </div>
        </div>

        {/* PATIENT INFO */}
        <div className="section">
          <div className="section-title">PROVIDER INFORMATION</div>

          <div className="grid-2">
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
            <input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <input
              placeholder="Phone No."
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            <input
              placeholder="Clinic Address"
              value={form.clinicAddress}
              onChange={(e) =>
                setForm({ ...form, clinicAddress: e.target.value })
              }
            />
            <select
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        {/* SECURITY */}
        <div className="section">
          <div className="section-title">SECURITY</div>

          <input
            className="full-width"
            type="password"
            placeholder="Password (12 chars, strong)"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* CONSENT */}
        <p className="consent">
          I confirm that the information provided is accurate and agree to
          receive healthcare-related communication.
        </p>

        {/* SUBMIT */}
        <button className="submit-btn">
          CREATE PROVIDER ACCOUNT
        </button>

        <p className="login-link">
          Already have an account? <a href="/provider/signin">Login</a>
        </p>

      </div>
    </div>
  );
};

export default ProviderSignup;
