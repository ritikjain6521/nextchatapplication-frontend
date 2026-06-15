import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useAuth } from '../../Context/AuthProvider';
import StatusViewer from '../../components/StatusViewer';
import { useSocket } from '../../Context/SocketContext';

const Status = () => {
    const [statuses, setStatuses] = useState([]);
    const [user] = useAuth();
    const { socket } = useSocket();
    const [viewingStatusUser, setViewingStatusUser] = useState(null);

    useEffect(() => {
        fetchStatuses();
        if (socket) {
            socket.on('newStatusUpdate', fetchStatuses);
        }
        return () => { if (socket) socket.off('newStatusUpdate', fetchStatuses); };
    }, [socket]);

    const fetchStatuses = async () => {
        try {
            const res = await axios.get('/api/status');
            setStatuses(res.data);
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('media', file);
        try {
            await axios.post('/api/status/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            fetchStatuses();
            if (socket) socket.emit('newStatus', { userId: user._id });
        } catch (error) {
            console.error("Error uploading status:", error);
        }
    };

    const myStatus = statuses.find(s => s.user?._id === user?._id);
    const otherStatuses = statuses.filter(s => s.user?._id !== user?._id);

    return (
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--text-muted)' }}>
                Recent Updates
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
                {/* My Status / Add */}
                <div
                    className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
                    onClick={() => myStatus
                        ? setViewingStatusUser(myStatus)
                        : document.getElementById('status-upload').click()
                    }
                >
                    <div className="relative">
                        <div
                            className="w-12 h-12 rounded-full p-[2px] transition-transform hover:scale-105"
                            style={myStatus
                                ? { background: 'linear-gradient(135deg, #7c6af7, #8b5cf6)' }
                                : { background: 'rgba(255,255,255,0.08)' }
                            }
                        >
                            <div className="w-full h-full rounded-full overflow-hidden" style={{ background: 'var(--bg-card)', border: '2px solid var(--bg-secondary)' }}>
                                <img
                                    src={user?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
                                    alt="My Status"
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
                                />
                            </div>
                        </div>
                        {!myStatus && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #7c6af7, #6366f1)', border: '1.5px solid var(--bg-secondary)' }}>
                                <Plus className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                        )}
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>My Status</span>
                    <input type="file" id="status-upload" className="hidden" accept="image/*,video/*" onChange={handleUpload} />
                </div>

                {/* Other Statuses */}
                {otherStatuses.map((userStatus) => (
                    <div
                        key={userStatus.user._id}
                        className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
                        onClick={() => setViewingStatusUser(userStatus)}
                    >
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full p-[2px] transition-transform hover:scale-105"
                                style={{ background: 'linear-gradient(135deg, #7c6af7, #8b5cf6)' }}>
                                <div className="w-full h-full rounded-full overflow-hidden" style={{ background: 'var(--bg-card)', border: '2px solid var(--bg-secondary)' }}>
                                    <img
                                        src={userStatus.user?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
                                        alt={userStatus.user.fullname}
                                        className="w-full h-full object-cover"
                                        onError={e => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="text-[11px] font-medium truncate w-14 text-center" style={{ color: 'var(--text-secondary)' }}>
                            {userStatus.user.fullname.split(' ')[0]}
                        </span>
                    </div>
                ))}
            </div>

            {viewingStatusUser && (
                <StatusViewer userStatus={viewingStatusUser} onClose={() => setViewingStatusUser(null)} />
            )}
        </div>
    );
};

export default Status;
