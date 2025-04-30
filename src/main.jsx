import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* <BrowserRouter>  */}
    {/* Wrap your app with BrowserRouter */}
   <BrowserRouter basename="/Abe-Garage-Frontend">
      <AuthProvider>
        <App />
      </AuthProvider>
  </BrowserRouter>
  </StrictMode>,
)

