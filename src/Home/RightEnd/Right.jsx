import React from 'react'
import ChatUser from './chatUser'
import Mesages from './Mesages.jsx'
import Typesend from './Typesend'
import useConversation from '../../Zustand/useConversation'

function Right() {
  const { selectedConversation } = useConversation()

  return (
    <div className={`flex-1 flex-col min-h-0 bg-transparent relative ${
      selectedConversation ? 'flex' : 'hidden md:flex'
    }`}>
       {selectedConversation ? (
         <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
           <ChatUser/>
           <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
             <Mesages/>
           </div>
           <Typesend/>
         </div>
       ) : (
         <div className="flex flex-col items-center justify-center h-full text-center p-8 gap-4 relative">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-xl shadow-brand-primary/10">💬</div>
            <h1 className="text-3xl font-bold text-white tracking-wide">NexChat</h1>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">Select a conversation from the sidebar to start securely messaging your connections.</p>
            
            {/* Footer Signature */}
            <div className="absolute bottom-8 text-center space-y-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <p className="text-slate-600 text-xs tracking-[0.2em] uppercase font-semibold">Enterprise Grade Communication</p>
                <p className="text-brand-primary/60 text-[10px] tracking-[0.15em] uppercase font-medium">
                    Engineered by <span className="text-brand-primary/80 font-bold">Ritik Jain</span>
                </p>
            </div>
         </div>
       )}
    </div>
  ) 
}

export default Right
