/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("ProtectedRoute user:", user);

  if (!user) return <Navigate to="/provider/signin" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!token) return <Navigate to="/provider/signin" replace />;

  return children;
}

export default ProtectedRoute;
