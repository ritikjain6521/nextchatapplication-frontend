import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/Authprovider.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'
import { CallProvider } from './Context/CallContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

// Route all API requests to the Render backend in production, or localhost in development
axios.defaults.baseURL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://nextchat-realtimeapplication-backend-2.onrender.com";
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <CallProvider>
          <App/>
        </CallProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
)
