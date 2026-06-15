import React, { useState } from 'react'
import useConversation from '../../Zustand/useConversation'
import { useSocket } from '../../Context/SocketContext'
import { Video, Phone, ArrowLeft, Search, MoreHorizontal, X, Hash } from 'lucide-react'
import { useCall } from '../../Context/CallContext'
import axios from 'axios'
import ViewInfoModal from '../../components/ViewInfoModal'
function ChatUser({ searchMessage, setSearchMessage }) {
  const { selectedConversation, setSelectedConversation } = useConversation() || {}
  const { onlineUsers } = useSocket() || { onlineUsers: [] }
  const { callUser } = useCall() || {}
  const [showSearch, setShowSearch] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  const handleClearChat = async () => {
    try {
      await axios.post(`/api/action/clear/${selectedConversation._id}`);
      useConversation.getState().setMessage([]);
      setShowMoreOptions(false);
    } catch (err) {
      console.log(err);
      alert("Failed to clear chat");
    }
  };

  const handleMute = async () => {
    try {
      await axios.post(`/api/action/mute/${selectedConversation._id}`);
      alert("Mute toggled successfully");
      setShowMoreOptions(false);
    } catch (err) {
      console.log(err);
      alert("Failed to toggle mute");
    }
  };

  const handleBlockLeave = async () => {
    try {
      if (selectedConversation.isGroup || selectedConversation.isChannel) {
        await axios.post(`/api/action/leave/${selectedConversation._id}`);
        alert("Left successfully");
        setSelectedConversation(null);
      } else {
        await axios.post(`/api/action/block/${selectedConversation._id}`);
        alert("Block toggled successfully");
      }
      setShowMoreOptions(false);
    } catch (err) {
      console.log(err);
      alert("Failed to perform action");
    }
  };

  const isOnline = Array.isArray(onlineUsers) ? onlineUsers.includes(selectedConversation?._id) : false
  const isChannel = selectedConversation?.isChannel || false;

  const handleVideoCall = () => {
    if (selectedConversation && callUser) {
      callUser(selectedConversation._id, 'video')
    }
  }

  const handleAudioCall = () => {
    if (selectedConversation && callUser) {
      callUser(selectedConversation._id, 'audio')
    }
  }

  if (!selectedConversation) return null;

  return (
    <div 
      className='flex-none shrink-0 min-h-[76px] w-full flex items-center justify-between px-5 md:px-6 z-50 transition-all'
      style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
    >
      {showSearch ? (
         <div className="flex items-center w-full gap-3 animate-fade-in">
            <button onClick={() => { setShowSearch(false); setSearchMessage(''); }} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
               <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-center bg-black/20 rounded-xl px-4 py-2.5 border border-white/10">
               <Search className="w-4 h-4 text-slate-400 mr-2" />
               <input 
                  type="text" 
                  autoFocus
                  placeholder="Search in chat..."
                  value={searchMessage}
                  onChange={(e) => setSearchMessage(e.target.value)}
                  className="bg-transparent outline-none text-white text-sm w-full"
               />
               {searchMessage && (
                  <button onClick={() => setSearchMessage('')} className="text-slate-400 hover:text-white">
                     <X className="w-4 h-4" />
                  </button>
               )}
            </div>
         </div>
      ) : (
         <>
           <div className='flex items-center gap-4'>
             {/* Mobile Back Button */}
             <button 
               onClick={() => setSelectedConversation(null)}
               className='md:hidden p-2 rounded-xl transition-all'
               style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)' }}
             >
               <ArrowLeft className="w-5 h-5" />
             </button>

             {/* Avatar */}
             <div className="relative shrink-0">
               {isChannel ? (
                 <div className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,106,247,0.3), rgba(99,102,241,0.2))', border: '1px solid rgba(124,106,247,0.3)' }}>
                   <Hash className="w-5 h-5" style={{ color: '#7c6af7' }} />
                 </div>
               ) : (
                 <div className={isOnline && !selectedConversation.isGroup && !selectedConversation.isAI ? 'avatar-ring-green' : 'avatar-ring-grey'}>
                   <div className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                     <img
                       src={selectedConversation?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
                       alt="avatar"
                       className="w-full h-full object-cover"
                       onError={(e) => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
                     />
                   </div>
                 </div>
               )}
             </div>

             {/* User / Group / Channel / AI Info */}
             <div className="flex flex-col">
               <h1 className='text-[15px] font-bold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                 {isChannel ? `# ${selectedConversation.groupName}` : selectedConversation?.isGroup ? selectedConversation.groupName : selectedConversation?.fullname || 'Select a chat'}
                 {!selectedConversation?.isGroup && !selectedConversation?.isAI && !isChannel && (
                   <svg className="inline-block w-4 h-4 ml-1.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                   </svg>
                 )}
               </h1>
               <div className="flex items-center gap-1.5 mt-0.5">
                 {!selectedConversation?.isGroup && !selectedConversation?.isAI && !isChannel && (
                   <span className={isOnline ? 'online-dot' : 'offline-dot'} style={{ width: '8px', height: '8px' }} />
                 )}
                 <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                   {isChannel
                     ? `${selectedConversation.members?.length || 0} subscribers`
                     : selectedConversation?.isGroup
                       ? `${selectedConversation.members?.length || 0} participants`
                       : selectedConversation?.isAI ? 'Always online · Gemini powered'
                       : (isOnline ? (selectedConversation?.customStatus || 'Online') : 'Offline')}
                 </span>
               </div>
             </div>
           </div>
           
           {/* Header Actions */}
           <div className='flex items-center gap-2 md:gap-3'>
             {!selectedConversation?.isGroup && !selectedConversation?.isAI && !isChannel && (
               <>
                 <button 
                   onClick={handleAudioCall}
                   className='p-2 md:p-2.5 rounded-full transition-all group'
                   title="Voice Call"
                   style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)' }}
                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,106,247,0.15)'; e.currentTarget.style.color = '#7c6af7'; }}
                   onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                 >
                   <Phone className="w-[18px] h-[18px]" />
                 </button>
                 <button 
                   onClick={handleVideoCall}
                   className='p-2 md:p-2.5 rounded-full transition-all group'
                   title="Video Call"
                   style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)' }}
                   onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,106,247,0.15)'; e.currentTarget.style.color = '#7c6af7'; }}
                   onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                 >
                   <Video className="w-[18px] h-[18px]" />
                 </button>
                 <div className="w-px h-5 bg-white/10 mx-1 hidden md:block"></div>
               </>
             )}
             <button 
               onClick={() => setShowSearch(true)}
               className='p-2 md:p-2.5 rounded-full transition-all hidden md:flex'
               title="Search in chat"
               style={{ color: 'var(--text-secondary)' }}
               onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
               onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
             >
               <Search className="w-[18px] h-[18px]" />
             </button>
             <div className="relative">
               <button 
                 onClick={() => setShowMoreOptions(!showMoreOptions)}
                 className='p-2 md:p-2.5 rounded-full transition-all'
                 title="More options"
                 style={{ 
                   color: showMoreOptions ? 'var(--text-primary)' : 'var(--text-secondary)',
                   background: showMoreOptions ? 'rgba(255,255,255,0.1)' : 'transparent'
                 }}
                 onMouseEnter={e => { if(!showMoreOptions) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                 onMouseLeave={e => { if(!showMoreOptions) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
               >
                 <MoreHorizontal className="w-[18px] h-[18px]" />
               </button>

               {/* Dropdown Menu */}
               {showMoreOptions && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setShowMoreOptions(false)} />
                   <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl z-50 overflow-hidden shadow-2xl border border-white/10 animate-fade-in" style={{ background: 'var(--bg-card)', backdropFilter: 'blur(16px)' }}>
                     <div className="flex flex-col py-2">
                       <button 
                         onClick={() => { setShowInfoModal(true); setShowMoreOptions(false); }}
                         className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm transition-colors text-white text-left w-full"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                         {selectedConversation?.isGroup || isChannel ? 'View Info' : 'View Profile'}
                       </button>

                       <button 
                         onClick={handleMute}
                         className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm transition-colors text-white text-left w-full"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                         Mute Notifications
                       </button>

                       <div className="h-px w-full my-1" style={{ background: 'var(--border-subtle)' }} />

                       <button 
                         onClick={handleClearChat}
                         className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm transition-colors text-left w-full"
                         style={{ color: '#ef4444' }}
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                         Clear Chat
                       </button>

                       {!selectedConversation?.isAI && (
                         <button 
                           onClick={handleBlockLeave}
                           className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm transition-colors text-left w-full"
                           style={{ color: '#ef4444' }}
                         >
                           {isChannel || selectedConversation?.isGroup ? (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                           ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                           )}
                           {isChannel ? 'Leave Channel' : selectedConversation?.isGroup ? 'Leave Group' : 'Block User'}
                         </button>
                       )}
                     </div>
                   </div>
                 </>
               )}
             </div>
           </div>
         </>
      )}
      
      {/* View Info Modal */}
      {showInfoModal && (
        <ViewInfoModal 
          isOpen={showInfoModal} 
          onClose={() => setShowInfoModal(false)} 
          conversation={selectedConversation}
          onAudioCall={
            (!selectedConversation?.isGroup && !selectedConversation?.isChannel && !selectedConversation?.isAI)
              ? handleAudioCall
              : undefined
          }
          onVideoCall={
            (!selectedConversation?.isGroup && !selectedConversation?.isChannel && !selectedConversation?.isAI)
              ? handleVideoCall
              : undefined
          }
          onSearch={() => setShowSearch(true)}
        />
      )}
    </div>
  )
}

export default ChatUser
