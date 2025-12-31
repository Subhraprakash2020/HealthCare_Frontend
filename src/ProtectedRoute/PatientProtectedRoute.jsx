import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function PatientProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/patient/signin" replace />;
  }

  return children;
}
PatientProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PatientProtectedRoute;
