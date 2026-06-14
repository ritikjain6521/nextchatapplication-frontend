import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../../Context/Authprovider';
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
            socket.on('newStatusUpdate', () => {
                fetchStatuses();
            });
        }

        return () => {
            if (socket) socket.off('newStatusUpdate');
        };
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
            await axios.post('/api/status/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchStatuses();
            if (socket) {
                socket.emit('newStatus', { userId: user._id });
            }
        } catch (error) {
            console.error("Error uploading status:", error);
        }
    };

    const myStatus = statuses.find(s => s.user?._id === user?._id);
    const otherStatuses = statuses.filter(s => s.user?._id !== user?._id);

    return (
        <div className="px-4 py-3 border-b border-white/10">
            <h2 className="text-sm font-semibold text-slate-400 mb-3 px-2">Recent Updates</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                
                {/* My Status / Add Status */}
                <div className="flex flex-col items-center space-y-1 min-w-16 cursor-pointer relative"
                     onClick={() => myStatus ? setViewingStatusUser(myStatus) : document.getElementById('status-upload').click()}
                >
                    <div className={`w-14 h-14 rounded-full p-[2px] ${myStatus ? 'bg-gradient-to-tr from-brand-primary to-brand-secondary' : 'bg-slate-700'}`}>
                        <div className="w-full h-full bg-brand-dark rounded-full overflow-hidden border-2 border-brand-dark">
                            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="My Status" className="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                    {!myStatus && (
                        <div className="absolute bottom-5 right-0 bg-brand-primary rounded-full text-white">
                            <PlusCircle className="w-5 h-5" />
                        </div>
                    )}
                    <span className="text-xs text-slate-300">My Status</span>
                    <input type="file" id="status-upload" className="hidden" accept="image/*,video/*" onChange={handleUpload} />
                </div>

                {/* Other Users' Statuses */}
                {otherStatuses.map((userStatus) => (
                    <div key={userStatus.user._id} 
                         className="flex flex-col items-center space-y-1 min-w-16 cursor-pointer"
                         onClick={() => setViewingStatusUser(userStatus)}
                    >
                        <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-brand-primary to-brand-secondary">
                            <div className="w-full h-full bg-brand-dark rounded-full overflow-hidden border-2 border-brand-dark">
                                <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt={userStatus.user.fullname} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-xs text-slate-300 truncate w-16 text-center">{userStatus.user.fullname.split(' ')[0]}</span>
                    </div>
                ))}
            </div>

            {viewingStatusUser && (
                <StatusViewer 
                    userStatus={viewingStatusUser} 
                    onClose={() => setViewingStatusUser(null)} 
                />
            )}
        </div>
    );
};

export default Status;
