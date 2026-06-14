import React from 'react'
import useConversation from '../../Zustand/useConversation.js'
import { useSocket } from '../../Context/SocketContext.jsx'

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocket();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-900 cursor-pointer duration-300">
        <div className={`avatar ${isOnline ? 'avatar-online' : 'avatar-offline'}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
