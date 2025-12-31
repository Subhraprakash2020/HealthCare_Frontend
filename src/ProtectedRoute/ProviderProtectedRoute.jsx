/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";

function ProviderProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/provider/signin" replace />;
  }

  return children;
}

export default ProviderProtectedRoute;