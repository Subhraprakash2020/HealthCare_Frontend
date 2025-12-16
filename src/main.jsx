import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProfilePatient from "./components/patients/layout/ProfilePatient.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfilePatient>
      <App />
    </ProfilePatient>
  </StrictMode>,
)
