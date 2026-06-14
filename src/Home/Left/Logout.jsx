import React from 'react'
import { LogOut } from "lucide-react";
import { useAuth } from '../../Context/AuthProvider';

function Logout() {
  const [user, setUser] = useAuth();
  const actualUser = user?.user || user?.User || user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
   <div className='p-4 border-t border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between'>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="Profile" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{actualUser?.fullname || "User"}</h2>
          <p className="text-xs text-slate-400 truncate w-24">{actualUser?.email || ""}</p>
        </div>
      </div>
      <button 
        onClick={handleLogout}
        className='text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 rounded-full p-2 group relative'
      >
        <LogOut className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
      </button>
   </div>
  )
}

export default Logout
