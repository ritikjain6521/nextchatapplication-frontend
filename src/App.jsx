import React from 'react'
import Left from './Home/Left/Left'
import Right from './Home/RightEnd/Right'
import Signup from './components/Signup'
import Login from './components/Login'
import { useAuth } from './Context/AuthProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import CallModal from './components/CallModal'
import VideoCallRoom from './components/VideoCallRoom'
import LandingPage from './components/LandingPage/LandingPage'
import AdminLayout from './components/Admin/AdminLayout'
import AdminLogin from './components/Admin/AdminLogin'
import Overview from './components/Admin/pages/Overview'
import UserManagement from './components/Admin/pages/UserManagement'
import RevenueAnalytics from './components/Admin/pages/RevenueAnalytics'
import SubscriptionManagement from './components/Admin/pages/SubscriptionManagement'
import Payments from './components/Admin/pages/Payments'
import AiCredits from './components/Admin/pages/AiCredits'
import Coupons from './components/Admin/pages/Coupons'
import SupportTickets from './components/Admin/pages/SupportTickets'
import Notifications from './components/Admin/pages/Notifications'
import PlaceholderModule from './components/Admin/pages/PlaceholderModule'
import { MessageSquare, Phone, Shield } from 'lucide-react'

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
        ) : <LandingPage />} />

        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/Login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path='/Signup' element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path='/admin-login' element={user?.isAdmin ? <Navigate to="/admin" /> : <AdminLogin />} />

        <Route path='/admin' element={user && user.isAdmin ? <AdminLayout /> : <Navigate to="/" />}>
          <Route index element={<Overview />} />
          <Route path='users' element={<UserManagement />} />
          <Route path='analytics' element={<RevenueAnalytics />} />
          <Route path='subscriptions' element={<SubscriptionManagement />} />
          <Route path='payments' element={<Payments />} />
          <Route path='ai-credits' element={<AiCredits />} />
          <Route path='chat-analytics' element={<PlaceholderModule title="Chat Analytics" description="Messages per day, active conversations, group activity, retention rates, and engagement metrics." icon={MessageSquare} />} />
          <Route path='call-analytics' element={<PlaceholderModule title="Voice & Video Analytics" description="Track call minutes, call success rates, active calls, and premium call usage reports." icon={Phone} />} />
          <Route path='tickets' element={<SupportTickets />} />
          <Route path='moderation' element={<PlaceholderModule title="Content Moderation" description="Review flagged messages, detect spam, block abuse and suspend accounts." icon={Shield} />} />
          <Route path='coupons' element={<Coupons />} />
          <Route path='notifications' element={<Notifications />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
