import React from 'react'
import Left from './Home/Left/Left'
import Right from './Home/RightEnd/Right'
import Signup from './components/Signup'
import Login from './components/Login'
import { useAuth } from './Context/AuthProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import CallModal from './components/CallModal'
import VideoCallRoom from './components/VideoCallRoom'

function App() {
  const [user] = useAuth();

  return (
    <>
      {user && <CallModal />}
      {user && <VideoCallRoom />}
      <Routes>
        <Route path='/' element={user ? (
          <div className='flex h-screen w-full overflow-hidden' style={{ background: 'var(--bg-primary)' }}>
            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-5%] w-[35%] h-[35%] rounded-full pointer-events-none animate-blob"
              style={{ background: 'radial-gradient(circle, rgba(124,106,247,0.12) 0%, transparent 70%)', zIndex: 0 }} />
            <div className="fixed bottom-[-20%] right-[-5%] w-[35%] h-[35%] rounded-full pointer-events-none animate-blob"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', zIndex: 0, animationDelay: '3s' }} />

            {/* App Layout */}
            <div className="relative z-10 flex w-full h-full">
              <Left />
              <Right />
            </div>
          </div>
        ) : <Navigate to={"/login"} />} />

        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/Login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path='/Signup' element={user ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </>
  )
}

export default App
