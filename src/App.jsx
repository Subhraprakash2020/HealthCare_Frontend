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

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path='/' element={<Home/>}/>
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
          </Routes>
       
        </AppLayout>

     
      </BrowserRouter>
    )
  }
}
export default App;