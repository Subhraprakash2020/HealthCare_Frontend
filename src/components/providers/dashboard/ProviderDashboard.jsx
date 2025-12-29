import React from "react";
import { useNavigate } from "react-router-dom";

function ProviderDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // from login response

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/provider/signin");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👋 Welcome, {user?.name || "Provider"}</h2>
      <p style={styles.subText}>You are logged in as: <strong>{user?.email}</strong></p>
      <p style={styles.role}>Role: <strong>{user?.role}</strong></p>

      <div style={styles.card}>
        <h3>📌 Dashboard Overview</h3>
        <ul>
          <li>View patient records (coming soon)</li>
          <li>Manage appointments (coming soon)</li>
          <li>Edit provider profile (coming soon)</li>
        </ul>
      </div>

      <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subText: { fontSize: "18px", marginBottom: "10px" },
  role: { fontSize: "16px", color: "#555", marginBottom: "30px" },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    textAlign: "left",
  },
  logoutBtn: {
    background: "crimson",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ProviderDashboard;
