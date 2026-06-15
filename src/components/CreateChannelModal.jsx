import React, { useState } from 'react';
import { X, Check, Hash } from 'lucide-react';
import axios from 'axios';

function CreateChannelModal({ onClose, allUsers, onChannelCreated }) {
    const [channelName, setChannelName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleCreate = async () => {
        if (!channelName.trim()) return;
        setLoading(true);
        try {
            await axios.post('/api/channel/create', {
                channelName,
                participants: selectedUsers
            });
            onChannelCreated?.();
            onClose();
        } catch (error) {
            console.error("Error creating channel:", error);
            alert("Failed to create channel");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md mx-4 rounded-3xl overflow-hidden shadow-2xl border border-white/10" style={{ background: 'var(--bg-card)' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,106,247,0.15)' }}>
                            <Hash className="w-5 h-5" style={{ color: '#7c6af7' }} />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Create Channel</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Channel Name</label>
                        <input
                            type="text"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            placeholder="e.g. announcements, general, news"
                            className="w-full px-4 py-3 rounded-xl outline-none text-white transition-all"
                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}
                        />
                        <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                            You will be the admin. Only admins can post in channels.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Add Subscribers ({selectedUsers.length} selected)
                        </label>
                        <div className="max-h-44 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: 'thin' }}>
                            {allUsers.map(user => (
                                <div
                                    key={user._id}
                                    onClick={() => toggleUser(user._id)}
                                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                                    style={{ background: selectedUsers.includes(user._id) ? 'rgba(124,106,247,0.1)' : 'var(--bg-primary)' }}
                                >
                                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                                        <img src={user.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} alt={user.fullname} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-white truncate">{user.fullname}</h3>
                                    </div>
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center border transition-all shrink-0"
                                        style={{ borderColor: selectedUsers.includes(user._id) ? '#7c6af7' : 'rgba(255,255,255,0.2)', background: selectedUsers.includes(user._id) ? '#7c6af7' : 'transparent' }}>
                                        {selectedUsers.includes(user._id) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-medium transition-colors" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={loading || !channelName.trim()}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${!channelName.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                        style={{ background: 'linear-gradient(135deg, #7c6af7, #6366f1)', color: 'white' }}
                    >
                        {loading ? 'Creating...' : 'Create Channel'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateChannelModal;
