import React, { useState } from 'react'
import { Send } from "lucide-react";
import useSendMessage from '../../Context/useSendMessage.js';

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex-none shrink-0 p-4 bg-transparent z-20 border-t border-white/5">
      <form onSubmit={handleSubmit} className='flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'>
        <div className='flex-1'>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent text-white placeholder-slate-400 outline-none w-full text-sm tracking-wide"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !message.trim()}
          className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${message.trim() ? 'bg-gradient-to-tr from-brand-primary to-brand-secondary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110' : 'bg-white/10 text-slate-400 opacity-50'}`}
        >
          <Send className='w-4 h-4'/>
        </button>
      </form>
    </div>
  )
}

export default Typesend
