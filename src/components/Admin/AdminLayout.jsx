import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CreditCard, Activity, Sparkles, 
  MessageSquare, Phone, Shield, Ticket, Bell, LogOut, Search, Settings 
} from 'lucide-react';
import { useAuth } from '../../Context/AuthProvider';

const AdminLayout = () => {
  const [authUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!authUser || !authUser.isAdmin) {
    navigate('/');
    return null;
  }

  const menuGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Overview', path: '/admin', icon: LayoutDashboard },
        { name: 'Revenue Analytics', path: '/admin/analytics', icon: Activity },
      ]
    },
    {
      title: 'Management',
      items: [
        { name: 'User Management', path: '/admin/users', icon: Users },
        { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
        { name: 'Payments & Refunds', path: '/admin/payments', icon: CreditCard },
      ]
    },
    {
      title: 'Features',
      items: [
        { name: 'AI Credits', path: '/admin/ai-credits', icon: Sparkles },
        { name: 'Chat Analytics', path: '/admin/chat-analytics', icon: MessageSquare },
        { name: 'Voice & Video', path: '/admin/call-analytics', icon: Phone },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Support Tickets', path: '/admin/tickets', icon: Ticket },
        { name: 'Content Moderation', path: '/admin/moderation', icon: Shield },
        { name: 'Coupons & Promos', path: '/admin/coupons', icon: Ticket },
        { name: 'Notifications', path: '/admin/notifications', icon: Bell },
      ]
    }
  ];

  return (
    <div className="flex h-[100dvh] w-full bg-[#0a0a0f] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`flex flex-col border-r border-white/5 bg-[#12121a] transition-all duration-300 ${isSidebarOpen ? 'w-[260px]' : 'w-[72px]'} shrink-0`}>
        {/* Logo area */}
        <div className="h-16 flex items-center px-4 border-b border-white/5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-indigo-600 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {isSidebarOpen && (
            <div className="ml-3 font-bold text-lg tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent truncate">
              NexChat Admin
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {menuGroups.map((group, i) => (
            <div key={i} className="mb-6">
              {isSidebarOpen && <h3 className="px-5 text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2">{group.title}</h3>}
              <nav className="flex flex-col gap-1 px-2">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${isActive ? 'bg-brand-primary/10 text-brand-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                      title={!isSidebarOpen ? item.name : ''}
                    >
                      <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-primary' : 'text-white/40 group-hover:text-white/80'}`} />
                      {isSidebarOpen && <span className="text-sm font-medium truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200">
            <LogOut className="w-4 h-4 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#12121a]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-brand-primary/50 w-[240px] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[#12121a]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">{authUser?.fullname || 'Admin'}</p>
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">Super Admin</p>
              </div>
              <img src={authUser?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} alt="Admin" className="w-9 h-9 rounded-full border-2 border-brand-primary/30" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
