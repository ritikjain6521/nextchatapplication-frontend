import React, { useState, useEffect, useRef } from 'react';
import { useCall } from '../Context/CallContext';
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const VideoCallRoom = () => {
    const {
        myVideo,
        userVideo,
        callAccepted,
        callEnded,
        leaveCall,
        isCalling,
        stream,
        remoteStream,
        callType,
    } = useCall();

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    // Attach local stream to my video element once both exist
    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream, myVideo]);

    // Attach remote stream to remote video element once both exist
    useEffect(() => {
        if (userVideo.current && remoteStream) {
            userVideo.current.srcObject = remoteStream;
        }
    }, [remoteStream, userVideo, callAccepted]);

    if (!isCalling && !callAccepted) return null;
    if (callEnded) return null;

    const toggleMute = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-40 bg-[#09090b] flex flex-col animate-fade-in">
            <div className="flex-1 relative p-4 flex items-center justify-center">

                {/* Remote Video (Full Screen) */}
                {callAccepted && !callEnded ? (
                    <div className="absolute inset-0 p-4">
                        <video
                            playsInline
                            ref={userVideo}
                            autoPlay
                            className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10 bg-slate-900"
                        />
                    </div>
                ) : (
                    <div className="text-white text-2xl animate-pulse z-10 font-light flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-3xl font-bold">
                            ...
                        </div>
                        <span>Calling...</span>
                    </div>
                )}

                {/* Local Video (Picture-in-Picture) */}
                {stream && (
                    <div className="absolute bottom-28 right-6 w-44 h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 z-20 transition-transform hover:scale-105 bg-slate-900">
                        <video
                            playsInline
                            muted
                            ref={myVideo}
                            autoPlay
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 text-xs text-white/60 font-medium">You</div>
                    </div>
                )}
            </div>

            {/* Controls Bar */}
            <div className="h-24 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center space-x-6 px-8 z-30 pb-4">
                <button
                    onClick={toggleMute}
                    title={isMuted ? "Unmute" : "Mute"}
                    className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${isMuted ? 'bg-red-500/80 hover:bg-red-600/80 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-white/20 hover:bg-white/30'}`}
                >
                    {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
                </button>

                {callType === 'video' && (
                    <button
                        onClick={toggleVideo}
                        title={isVideoOff ? "Turn on camera" : "Turn off camera"}
                        className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${isVideoOff ? 'bg-red-500/80 hover:bg-red-600/80 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
                    </button>
                )}

                <button
                    onClick={leaveCall}
                    title="End call"
                    className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-transform hover:scale-110"
                >
                    <PhoneOff className="w-8 h-8 text-white" />
                </button>
            </div>
        </div>
    );
};

export default VideoCallRoom;
