import { Routes, Route } from "react-router-dom";
import SignIn from "../components/patients/home/SignIn";
import SignUp from "../components/patients/home/SignUp";
import Dashboard from "../components/patients/layout/Dashboard";
import SearchResults from "../components/patients/layout/SearchResults";
import ProfileEdit from "../components/patients/layout/ProfileEdit";
import ProfileImageEdit from "../components/patients/layout/ProfileImageEdit";
import ProviderDetails from "../components/patients/layout/ProviderDetails";
import PatientProfile from "../components/patients/layout/PatientProfile";
import SlotBookingPage from "../components/patients/layout/SlotBookingPage";
import BookingSuccess from "../components/patients/layout/BookingSuccess";
import PatientProtectedRoute from "../ProtectedRoute/PatientProtectedRoute";
import AppLayout from "../layout/AppLayout";

const PatientRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="dashboard"
          element={
            <PatientProtectedRoute>
              <Dashboard />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="/provider-search-results"
          element={
            <PatientProtectedRoute>
              <SearchResults />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="profileInfo"
          element={
            <PatientProtectedRoute>
              <PatientProfile />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="profileInfo/edit"
          element={
            <PatientProtectedRoute>
              <ProfileEdit />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="profileImage/edit"
          element={
            <PatientProtectedRoute>
              <ProfileImageEdit />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="providers/details/:providerId"
          element={
            <PatientProtectedRoute>
              <ProviderDetails />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="slot/:availabilityId"
          element={
            <PatientProtectedRoute>
              <SlotBookingPage />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="booking-success"
          element={
            <PatientProtectedRoute>
              <BookingSuccess />
            </PatientProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
};

export default PatientRoutes;
