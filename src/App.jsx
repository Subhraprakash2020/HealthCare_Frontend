import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './components/patients/home/SignIn';
import SignUp from './components/patients/home/SignUp';
import Home from './components/patients/home/Home';
import './App.css';
import { Form } from 'react-bootstrap';
import './css/custom.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
     
      </BrowserRouter>
    )
  }
}
export default App;