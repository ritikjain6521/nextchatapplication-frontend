import React from 'react'
import { useAuth } from '../../Context/Authprovider';

function Message({ message }) {
  const [user] = useAuth();
  const actualUser = user?.user || user?.User || user;
  
  const isMe = message.senderId === actualUser?._id; 
  
  return (
    <div className='p-4 py-1.5'>
      <div className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
        <div className={`chat-bubble text-white shadow-md text-sm tracking-wide ${
          isMe 
            ? 'bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm' 
            : 'bg-white/10 backdrop-blur-md border border-white/5 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm'
        }`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-60 text-[10px] mt-1 text-slate-400 font-medium tracking-widest">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default Message;
