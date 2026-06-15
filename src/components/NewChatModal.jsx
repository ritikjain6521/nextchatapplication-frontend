import React from 'react';
import { X } from 'lucide-react';
import useConversation from '../Zustand/useConversation';

function NewChatModal({ onClose, allUsers }) {
    const { setSelectedConversation } = useConversation();

    const handleSelectUser = (user) => {
        setSelectedConversation(user);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md mx-4 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col" style={{ background: 'var(--bg-card)', maxHeight: '80vh' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
                    <h2 className="text-xl font-semibold text-white">New Chat</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-2" style={{ scrollbarWidth: 'thin' }}>
                    <label className="block text-sm font-medium text-slate-300 mb-4">
                        Select a contact to start messaging
                    </label>
                    <div className="space-y-2">
                        {allUsers.filter(u => !u.isGroup).map(user => (
                            <div 
                                key={user._id} 
                                onClick={() => handleSelectUser(user)}
                                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-white/5"
                                style={{ background: 'var(--bg-primary)' }}
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                    <img src={user.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} alt={user.fullname} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-white truncate">{user.fullname}</h3>
                                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewChatModal;
