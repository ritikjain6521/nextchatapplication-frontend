import React from 'react'
import Left from './Home/Left/Left'
import Right from './Home/RightEnd/Right'
import Signup from './components/Signup'
import Login from './components/Login'
import { useAuth } from './Context/Authprovider'
import { Navigate, Route, Routes } from 'react-router-dom'
import CallModal from './components/CallModal'
import VideoCallRoom from './components/VideoCallRoom'

function App() {
  const [user, setUser] = useAuth();
  
  return (
    <>
      {user && <CallModal />}
      {user && <VideoCallRoom />}
      <Routes>
        <Route path='/' element={user ? (
          <div className='relative flex h-screen w-full bg-[#09090b] overflow-hidden'>
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/20 blur-[120px] pointer-events-none animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/20 blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>
            
            {/* Main App Container */}
            <div className="relative z-10 flex w-full h-full glassmorphism-dark">
              <Left/>
              <Right/> 
            </div>
          </div>
        ) : <Navigate to={"/login"}/>} />
        
        <Route path='/login' element={user? <Navigate to="/"/>:<Login/>} />
        <Route path='/signup' element={user? <Navigate to="/"/>:<Signup/>} />
      </Routes>
    </>
  )
}

export default App
