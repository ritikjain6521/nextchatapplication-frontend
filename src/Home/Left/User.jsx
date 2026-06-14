import React from 'react'
import useConversation from '../../Zustand/useConversation.js'
import { useSocket } from '../../Context/SocketContext.jsx'
import { Phone, Video } from 'lucide-react'
import { useCall } from '../../Context/CallContext.jsx'

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocket();
  const { callUser } = useCall();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleAudioCall = (e) => {
    e.stopPropagation();
    setSelectedConversation(user);
    callUser(user._id, 'audio');
  };

  const handleVideoCall = (e) => {
    e.stopPropagation();
    setSelectedConversation(user);
    callUser(user._id, 'video');
  };

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-900 cursor-pointer duration-300 group">
        <div className={`avatar ${isOnline ? 'avatar-online' : 'avatar-offline'}`}>
          <div className="w-12 rounded-full overflow-hidden">
            <img 
              src={user?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} 
              alt={user.fullname}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="overflow-hidden">
            <h1 className="font-bold truncate">{user.fullname}</h1>
            <span className="text-xs text-slate-400 truncate block">{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={handleAudioCall} 
                className="p-2 rounded-full bg-slate-800 hover:bg-brand-secondary/20 text-slate-300 hover:text-brand-secondary transition-colors"
                title="Voice Call"
            >
                <Phone className="w-4 h-4" />
            </button>
            <button 
                onClick={handleVideoCall} 
                className="p-2 rounded-full bg-slate-800 hover:bg-brand-primary/20 text-slate-300 hover:text-brand-primary transition-colors"
                title="Video Call"
            >
                <Video className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
