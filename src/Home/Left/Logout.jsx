import React from 'react'
import { LogOut, Sun, Moon } from "lucide-react";
// @ts-ignore
import { useAuth } from '../../Context/AuthProvider';
import { useTheme } from '../../Context/ThemeContext';

function Logout() {
  const [user, setUser] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const actualUser = user?.user || user?.User || user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className='flex items-center gap-3 px-4 py-3'>
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="avatar-ring-green">
          <div className="w-9 h-9 rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
            <img
              src={actualUser?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={e => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
            />
          </div>
        </div>
        <span className="absolute bottom-0 right-0" style={{
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: '#22c55e',
          border: '2px solid var(--bg-secondary)',
          boxShadow: '0 0 5px rgba(34,197,94,0.5)',
        }} />
      </div>

      {/* Name + Email */}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
          {actualUser?.fullname || "User"}
        </h2>
        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
          {actualUser?.email || ""}
        </p>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,106,247,0.15)'; e.currentTarget.style.color = '#a78bfa'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        {theme === 'dark'
          ? <Sun className='w-4 h-4' />
          : <Moon className='w-4 h-4' />
        }
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 group shrink-0"
        title="Logout"
        style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ef4444'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        <LogOut className='w-4 h-4' />
      </button>
    </div>
  )
}

export default Logout
