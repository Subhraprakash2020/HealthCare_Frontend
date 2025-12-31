import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
};

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtectedRoute;
