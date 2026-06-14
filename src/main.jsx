import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/Authprovider.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'
import { CallProvider } from './Context/CallContext.jsx'
import { BrowserRouter } from 'react-router-dom'


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
