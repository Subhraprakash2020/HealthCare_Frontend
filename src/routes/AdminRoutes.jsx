import { Routes, Route } from "react-router-dom";
import AdminSignIn from "../components/admin/AdminSignIn";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";

const AdminRoutes = () => (
  <Routes>
    <Route path="signin" element={<AdminSignIn />} />

    <Route
      path="dashboard"
      element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;
