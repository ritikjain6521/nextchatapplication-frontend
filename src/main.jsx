import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'
import { CallProvider } from './Context/CallContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

// Route all API requests to the Render backend in production, or localhost in development
axios.defaults.baseURL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://nextchat-realtimeapplication-backend-4.onrender.com";
axios.defaults.withCredentials = true;

// Add token from localStorage for incognito support
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <CallProvider>
            <App/>
          </CallProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
