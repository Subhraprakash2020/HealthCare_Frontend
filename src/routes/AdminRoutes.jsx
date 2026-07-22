import { Routes, Route } from "react-router-dom";
import AdminSignIn from "../components/admin/AdminSignIn";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import AdminPatientDashboard from "../components/admin/content/AdminPatientDashboard";
import AdminProviderDashboard from "../components/admin/content/AdminProviderDashboard";

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
    <Route
      path="content/AdminPatientDashboard"
      element={
        <AdminProtectedRoute>
          <AdminPatientDashboard />
        </AdminProtectedRoute>
      }
    />
     <Route
      path="content/AdminProviderDashboard"
      element={
        <AdminProtectedRoute>
          <AdminProviderDashboard />
        </AdminProtectedRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;
