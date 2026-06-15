import React, { useState } from 'react'
// @ts-ignore
import { useAuth } from '../../Context/AuthProvider';
import { Star, FileText, Download } from 'lucide-react';
import axios from 'axios';

// Resolve relative /uploads/... to the full backend origin
const BACKEND_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:3000'
  : 'https://nextchat-realtimeapplication-backend-2.onrender.com';

const resolveMedia = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return BACKEND_URL + url;
};

function Message({ message }) {
  const [user] = useAuth();
  const actualUser = user?.user || user?.User || user;
  const [isStarred, setIsStarred] = useState(false);
  const [starLoading, setStarLoading] = useState(false);
  
  const isMe = message.senderId === actualUser?._id; 
  const isAIMessage = message.senderId === 'ai_assistant';

  const handleToggleStar = async () => {
    if (!message._id || message._id.startsWith('ai_') || message._id.startsWith('me_')) return;
    setStarLoading(true);
    try {
      if (isStarred) {
        await axios.post(`/api/message/unstar/${message._id}`);
        setIsStarred(false);
      } else {
        await axios.post(`/api/message/star/${message._id}`);
        setIsStarred(true);
      }
    } catch (err) {
      console.error("Star toggle error:", err);
    } finally {
      setStarLoading(false);
    }
  };
  
  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} px-4 py-2 group animate-fade-slide-up`}>
      {/* Avatar (only show for received messages) */}
      {!isMe && (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-3 mt-auto mb-1 hidden sm:block" style={{ background: 'var(--bg-secondary)' }}>
           {isAIMessage ? (
             <img src="https://cdn-icons-png.flaticon.com/512/8649/8649605.png" alt="AI" className="w-full h-full object-cover p-1" />
           ) : (
             <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="avatar" className="w-full h-full object-cover" />
           )}
        </div>
      )}

      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%] md:max-w-[65%]`}>
        <div 
          className="px-4 py-2.5 shadow-sm relative text-[15px] tracking-wide"
          style={isMe 
            ? { 
                background: 'linear-gradient(135deg, #7c6af7, #6366f1)', 
                color: '#ffffff',
                borderRadius: '18px 18px 4px 18px',
                boxShadow: '0 4px 15px rgba(124,106,247,0.2)'
              } 
            : isAIMessage
              ? {
                  background: 'linear-gradient(135deg, rgba(124,106,247,0.12), rgba(99,102,241,0.08))',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(124,106,247,0.25)',
                  borderRadius: '18px 18px 18px 4px'
                }
              : { 
                  background: 'var(--bg-card)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '18px 18px 18px 4px'
                }
          }
        >
          {/* Media Attachments */}
          {message.mediaUrl && (() => {
            const src = resolveMedia(message.mediaUrl);
            return (
              <div className={`mb-2 rounded-xl overflow-hidden ${message.message ? 'mb-2' : ''}`}>
                {message.mediaType === 'image' && (
                  <a href={src} target="_blank" rel="noreferrer">
                    <img
                      src={src}
                      alt="attachment"
                      className="max-w-[240px] sm:max-w-xs rounded-xl object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onError={e => { e.target.style.display='none'; }}
                    />
                  </a>
                )}
                {message.mediaType === 'video' && (
                  <video controls src={src} className="max-w-[240px] sm:max-w-xs rounded-xl" />
                )}
                {message.mediaType === 'audio' && (
                  <audio controls src={src} className="max-w-[240px] h-10" />
                )}
                {message.mediaType === 'document' && (
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm underline hover:opacity-80 py-1"
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate max-w-[180px]">
                      {message.mediaUrl.split('/').pop()}
                    </span>
                    <Download className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}
              </div>
            );
          })()}
          
          {/* Text Message */}
          {message.message && (
             <div className="whitespace-pre-wrap word-break-all">
                {message.message}
             </div>
          )}
          
          {/* Hover actions: Star + React */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${isMe ? '-left-20' : '-right-20'} opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
            {/* Star button - only for real DB messages */}
            {message._id && !message._id.startsWith('ai_') && !message._id.startsWith('me_') && (
              <button 
                onClick={handleToggleStar}
                disabled={starLoading}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                title={isStarred ? "Unstar message" : "Star message"}
              >
                <Star className="w-3.5 h-3.5" style={{ color: isStarred ? '#fbbf24' : '#94a3b8', fill: isStarred ? '#fbbf24' : 'none' }} />
              </button>
            )}
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </button>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 mt-1.5 px-1">
          <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isStarred && <Star className="w-3 h-3" style={{ color: '#fbbf24', fill: '#fbbf24' }} />}
          {isMe && (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]" style={{ color: '#7c6af7' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L7 17l-5-5"></path><path d="M22 10l-11 11"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message;
