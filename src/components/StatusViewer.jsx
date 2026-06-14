import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const StatusViewer = ({ userStatus, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const statuses = userStatus.statuses || [];
    const currentMedia = statuses[currentIndex];

    useEffect(() => {
        if (!currentMedia) return;

        // Auto-advance every 5 seconds for images
        let interval;
        if (currentMedia.type !== 'video') {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        nextStatus();
                        return 0;
                    }
                    return prev + 2; // 2% every 100ms = 5 seconds total
                });
            }, 100);
        }

        return () => clearInterval(interval);
    }, [currentIndex, currentMedia]);

    const nextStatus = () => {
        if (currentIndex < statuses.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    };

    const prevStatus = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        }
    };

    if (!currentMedia) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-fade-in backdrop-blur-xl">
            {/* Progress Bars */}
            <div className="absolute top-4 left-0 right-0 px-4 flex space-x-2 z-10">
                {statuses.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white transition-all duration-100 ease-linear"
                            style={{ 
                                width: idx === currentIndex ? `${progress}%` : (idx < currentIndex ? '100%' : '0%') 
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="absolute top-8 left-4 flex items-center space-x-3 z-10">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="Avatar" />
                </div>
                <div>
                    <h3 className="text-white font-semibold">{userStatus.user?.fullname}</h3>
                    <p className="text-white/60 text-xs">
                        {new Date(currentMedia.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-8 right-4 text-white hover:text-red-400 transition-colors z-10"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Media Content */}
            <div className="flex-1 relative flex items-center justify-center">
                <div className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10" onClick={prevStatus} />
                <div className="absolute right-0 top-0 bottom-0 w-2/3 cursor-pointer z-10" onClick={nextStatus} />
                
                {currentMedia.type === 'video' ? (
                    <video 
                        src={`http://localhost:3000${currentMedia.mediaUrl}`}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                    />
                ) : (
                    currentMedia.mediaUrl ? (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                            <img 
                                src={`http://localhost:3000${currentMedia.mediaUrl}`} 
                                alt="status" 
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary">
                            <h2 className="text-4xl text-white font-bold p-8 text-center">{currentMedia.text}</h2>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default StatusViewer;
