import { Routes, Route } from "react-router-dom";
import ProviderHome from "../components/providers/home/ProviderHome";
import ProviderSignin from "../components/providers/auth/ProviderSignin";
import ProviderSignup from "../components/providers/auth/ProviderSignup";
import ProviderDashboard from "../components/providers/dashboard/ProviderDashboard";
import ProviderProtectedRoute from "../ProtectedRoute/ProviderProtectedRoute";

const ProviderRoutes = () => (
  <Routes>
    <Route path="/" element={<ProviderHome />} />
    <Route path="signin" element={<ProviderSignin />} />
    <Route path="signup" element={<ProviderSignup />} />

    <Route
      path="dashboard"
      element={
        <ProviderProtectedRoute>
          <ProviderDashboard />
        </ProviderProtectedRoute>
      }
    />
  </Routes>
);

export default ProviderRoutes;
