import React, { useState } from 'react'
import ChatUser from './chatUser'
import Mesages from './Mesages.jsx'
import Typesend from './Typesend'
import useConversation from '../../Zustand/useConversation'

function Right() {
  const { selectedConversation } = useConversation()
  const [searchMessage, setSearchMessage] = useState('')

  return (
    <div 
      className={`flex-1 flex-col min-h-0 relative z-0 ${selectedConversation ? 'flex' : 'hidden md:flex'}`}
      style={{ background: 'var(--bg-primary)' }}
    >
       {selectedConversation ? (
         <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
           <ChatUser searchMessage={searchMessage} setSearchMessage={setSearchMessage} />
           <div className="flex-1 min-h-0 flex flex-col relative z-0">
             {/* Background Pattern Overlay (Optional) */}
             <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
             
             <div className="flex-1 overflow-hidden relative z-10">
                <Mesages searchMessage={searchMessage} />
             </div>
             
             <div className="shrink-0 relative z-20 pb-20 md:pb-0">
                <Typesend/>
             </div>
           </div>
         </div>
       ) : (
         <div className="flex flex-col items-center justify-center h-full text-center p-8 gap-5 relative z-10">
            {/* Empty State Artwork */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full"></div>
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl relative z-10"
                style={{ background: 'linear-gradient(135deg, #1a1b2e, #13141f)', border: '1px solid var(--border-subtle)' }}>
                <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-2 max-w-sm mt-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">Chattie Messaging</h1>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Select a conversation from the sidebar to start securely messaging your connections.
              </p>
            </div>
            
            {/* Call to action badges */}
            <div className="flex gap-3 mt-6">
              <span className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}>End-to-End Encrypted</span>
              <span className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}>Lightning Fast</span>
            </div>
            
            {/* Footer Signature */}
            <div className="absolute bottom-8 text-center space-y-1.5 opacity-60">
                <p className="text-[10px] tracking-[0.15em] uppercase font-bold" style={{ color: 'var(--brand-primary)' }}>
                    Built with React & Tailwind
                </p>
            </div>
         </div>
       )}
    </div>
  ) 
}

export default Right
