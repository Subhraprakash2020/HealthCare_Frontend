import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './components/patients/home/SignIn';
import SignUp from './components/patients/home/SignUp';
import Home from './components/patients/home/Home';
import './App.css';
import { Form } from 'react-bootstrap';
import './css/custom.css';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/patients/layout/Dashboard';
import SearchResults from './components/patients/layout/SearchResults';
import ProfileImageEdit from './components/patients/layout/ProfileImageEdit';
import ProviderDetails from './components/patients/layout/ProviderDetails';
import AppLayout from './layout/AppLayout';
import ProfileEdit from './components/patients/layout/ProfileEdit';
import PatientProfile from './components/patients/layout/PatientProfile';
import SlotBookingPage from './components/patients/layout/SlotBookingPage';
import AdminSignIn from './components/admin/AdminSignIn';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import BookingSuccess from './components/patients/layout/BookingSuccess';
import ProviderHome from './components/providers/home/ProviderHome';
//import { ProviderSignin, ProviderSignup } from './components/providers/auth/ProviderAuth';
import ProviderSignin from './components/providers/auth/ProviderSignin';
import ProviderSignup from './components/providers/auth/ProviderSignup';
import ProviderDashboard from './components/providers/dashboard/ProviderDashboard';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/healthcare/admin/signin' element={<AdminSignIn/>}/>
            <Route path='/healthcare/admin/AdminDashboard' element={
              <AdminProtectedRoute>
                <AdminDashboard/>
              </AdminProtectedRoute>
            }/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/patient/dashboard" element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }/>
            <Route path="/provider-search-results" element={
              <ProtectedRoute>
                <SearchResults/>
              </ProtectedRoute>
            }/>
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <ProfileEdit/>
              </ProtectedRoute>
            }/>
            <Route path="/provider-search-results" element={
              <ProtectedRoute>
                <SearchResults/>
              </ProtectedRoute>
            }/>
            <Route path="/profileImage/edit" element={
              <ProtectedRoute>
                <ProfileImageEdit/>
              </ProtectedRoute>
            }/>
            <Route path="/providers/details/:providerId"
              element={
                <ProtectedRoute>
                  <ProviderDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/profileInfo"
              element={
                <ProtectedRoute>
                  <PatientProfile/>
                </ProtectedRoute>
              }
            />
            <Route path="/profileInfo/edit"
              element={
                <ProtectedRoute>
                  <ProfileEdit/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/slot/:availabilityId"
              element={<SlotBookingPage />}
            />
            <Route path="/patient/booking-success" 
              element={
                <ProtectedRoute>
                  <BookingSuccess />
                </ProtectedRoute>
              } />
              {/* Provider routes */}
          <Route path="/provider" element={<ProviderHome />} />
          <Route path="/provider/signin" element={<ProviderSignin />} />
          <Route path="/provider/signup" element={<ProviderSignup />} />
          <Route path="/provider/dashboard" element={
            <ProtectedRoute role="PROVIDER">
              <ProviderDashboard />
            </ProtectedRoute>
          } />
          </Routes>
       
        </AppLayout>

     
      </BrowserRouter>
    )
  }
}
export default App;