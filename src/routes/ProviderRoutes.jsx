import { Routes, Route } from "react-router-dom";
import ProviderHome from "../components/providers/home/ProviderHome";
import ProviderSignin from "../components/providers/auth/ProviderSignin";
import ProviderSignup from "../components/providers/auth/ProviderSignup";
import ProviderDashboard from "../components/providers/dashboard/ProviderDashboard";
import ProviderProtectedRoute from "../ProtectedRoute/ProviderProtectedRoute";
import CreateAvailability from "../components/providers/dashboard/CreateAvailability";
import ProviderAvailabilityList from "../components/providers/dashboard/ProviderAvailabilityList";
import ProviderSlotsPage from "../components/providers/dashboard/ProviderSlotsPage";

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

    <Route path="create-availability" element={
      <ProviderProtectedRoute>
        <CreateAvailability/>
      </ProviderProtectedRoute>
    }
    />

    <Route path="availabilities" element={
      <ProviderProtectedRoute>
        <ProviderAvailabilityList/>
      </ProviderProtectedRoute>
    }
    />

    <Route
      path="availability/:availabilityId/slots"
      element={
        <ProviderProtectedRoute>
          <ProviderSlotsPage />
        </ProviderProtectedRoute>
      }
    />

  </Routes>
);

export default ProviderRoutes;
