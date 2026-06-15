import React from 'react';
import { X, User, Users, Hash, Phone, Video, Calendar, Search } from 'lucide-react';

function ViewInfoModal({ isOpen, onClose, conversation, onAudioCall, onVideoCall, onSearch }) {
  if (!isOpen || !conversation) return null;

  const isGroup = conversation.isGroup;
  const isChannel = conversation.isChannel;
  const isUser = !isGroup && !isChannel;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <div 
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
      >
        {/* Header Background */}
        <div className="h-32 w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="px-6 pb-6 relative flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-[color:var(--bg-secondary)] overflow-hidden -mt-12 bg-slate-800 flex items-center justify-center shadow-lg">
            {isUser && (
              <img 
                src={conversation.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} 
                alt="profile" 
                className="w-full h-full object-cover"
              />
            )}
            {isGroup && !isChannel && (
               conversation.groupIcon ? (
                 <img src={conversation.groupIcon} alt="group" className="w-full h-full object-cover" />
               ) : (
                 <Users className="w-10 h-10 text-white/50" />
               )
            )}
            {isChannel && (
               conversation.groupIcon ? (
                 <img src={conversation.groupIcon} alt="channel" className="w-full h-full object-cover" />
               ) : (
                 <Hash className="w-10 h-10 text-white/50" />
               )
            )}
          </div>

          <h2 className="text-xl font-bold mt-4" style={{ color: 'var(--text-primary)' }}>
            {isUser ? conversation.fullname : conversation.groupName}
          </h2>
          
          {isUser && conversation.email && (
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {conversation.email}
            </p>
          )}

          <div className="flex gap-4 mt-6 w-full justify-center">
            {onAudioCall && (
              <button
                onClick={() => { onClose(); onAudioCall(); }}
                className="flex flex-col items-center gap-2 group"
                style={{ color: 'var(--text-primary)' }}
                title="Start audio call"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/25 group-hover:scale-110 transition-all duration-200">
                   <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Audio</span>
              </button>
            )}
            {onVideoCall && (
              <button
                onClick={() => { onClose(); onVideoCall(); }}
                className="flex flex-col items-center gap-2 group"
                style={{ color: 'var(--text-primary)' }}
                title="Start video call"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/25 group-hover:scale-110 transition-all duration-200">
                   <Video className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Video</span>
              </button>
            )}
            <button
              onClick={() => { onClose(); if (onSearch) onSearch(); }}
              className="flex flex-col items-center gap-2 group"
              style={{ color: 'var(--text-primary)' }}
              title="Search in chat"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/25 group-hover:scale-110 transition-all duration-200">
                 <Search className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Search</span>
            </button>
          </div>

          {/* Info Cards */}
          <div className="w-full mt-6 space-y-3 text-left">
            {isUser && conversation.bio && (
              <div className="p-4 rounded-2xl bg-black/20">
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>BIO</p>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{conversation.bio}</p>
              </div>
            )}
            {isUser && conversation.customStatus && (
               <div className="p-4 rounded-2xl bg-black/20">
                 <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>STATUS</p>
                 <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{conversation.customStatus}</p>
               </div>
            )}
            
            <div className="p-4 rounded-2xl bg-black/20 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <div>
                 <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>JOINED</p>
                 <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                   {new Date(conversation.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewInfoModal;
