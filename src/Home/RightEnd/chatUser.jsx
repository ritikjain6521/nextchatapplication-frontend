import React from 'react'
import useConversation from '../../Zustand/useConversation'
import { useSocket } from '../../Context/SocketContext'
import { Video, Phone, ArrowLeft } from 'lucide-react'
import { useCall } from '../../Context/CallContext'

function ChatUser() {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { onlineUsers } = useSocket()
  const { callUser } = useCall()

  const isOnline = onlineUsers.includes(selectedConversation?._id)

  const handleVideoCall = () => {
    if (selectedConversation) {
      callUser(selectedConversation._id, 'video')
    }
  }

  const handleAudioCall = () => {
    if (selectedConversation) {
      callUser(selectedConversation._id, 'audio')
    }
  }

  return (
    <div className='flex-none shrink-0 flex items-center justify-between px-4 md:px-8 py-4 bg-white/5 backdrop-blur-2xl border-b border-white/10 z-20 shadow-sm'>
      <div className='flex items-center space-x-3 md:space-x-4'>
        {/* Mobile Back Button */}
        <button 
          onClick={() => setSelectedConversation(null)}
          className='md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white'
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className={`avatar ${isOnline ? 'avatar-online' : 'avatar-offline'}`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] shadow-lg overflow-hidden ${isOnline ? 'border-brand-primary' : 'border-slate-700'}`}>
            <img 
              src={selectedConversation?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} 
              alt="avatar"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
            />
          </div>
        </div>
        <div>
          <h1 className='text-base md:text-lg font-bold text-white tracking-wide'>
            {selectedConversation ? selectedConversation.fullname : "Select a user"}
          </h1>
          <span className={`text-[10px] md:text-xs font-medium tracking-wider uppercase ${isOnline ? 'text-brand-primary' : 'text-slate-500'}`}>
            {isOnline 
              ? (selectedConversation?.customStatus || 'Online') 
              : 'Offline'
            }
          </span>
        </div>
      </div>
      
      {/* Call Buttons */}
      {selectedConversation && (
        <div className='flex space-x-2 md:space-x-4'>
          <button 
            onClick={handleVideoCall}
            className='p-2 md:p-3 rounded-full bg-brand-primary/10 hover:bg-brand-primary/30 transition-all text-brand-primary hover:text-white shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]'
          >
            <Video className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            onClick={handleAudioCall}
            className='p-2 md:p-3 rounded-full bg-brand-secondary/10 hover:bg-brand-secondary/30 transition-all text-brand-secondary hover:text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]'
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatUser
