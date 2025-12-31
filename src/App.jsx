import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/custom.css";
import Home from "./components/patients/home/Home";
import PatientRoutes from "./routes/PatientRoutes";
import ProviderRoutes from "./routes/ProviderRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/patient/*" element={<PatientRoutes />} />
        <Route path="/provider/*" element={<ProviderRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
