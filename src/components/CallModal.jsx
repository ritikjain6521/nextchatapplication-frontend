import React, { useEffect, useRef } from 'react';
import { useCall } from '../Context/CallContext';
import { Phone, Video, X } from 'lucide-react';

const CallModal = () => {
    const { receivingCall, callerName, answerCall, leaveCall, callAccepted, callType } = useCall();
    const audioRef = useRef(null);

    // iPhone "Opening" ringtone synthesized with Web Audio API
    useEffect(() => {
        if (receivingCall && !callAccepted) {
            let intervalId = null;

            const playiPhoneRing = () => {
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();

                    const playNote = (freq, start, dur, vol = 0.35) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
                        gain.gain.setValueAtTime(0, ctx.currentTime + start);
                        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
                        osc.start(ctx.currentTime + start);
                        osc.stop(ctx.currentTime + start + dur);
                    };

                    // iPhone "Opening" melody pattern: E5 A5 C6 E6 — classic pattern
                    playNote(659.25, 0.00, 0.14); // E5
                    playNote(880.00, 0.13, 0.14); // A5
                    playNote(1046.5, 0.26, 0.14); // C6
                    playNote(1318.5, 0.39, 0.25); // E6
                    playNote(1046.5, 0.60, 0.14); // C6
                    playNote(1318.5, 0.73, 0.35); // E6 (hold)
                } catch (e) { /* ignore */ }
            };

            playiPhoneRing();
            intervalId = setInterval(playiPhoneRing, 2000);
            audioRef.current = intervalId;
            return () => clearInterval(intervalId);
        } else {
            if (audioRef.current) clearInterval(audioRef.current);
        }
    }, [receivingCall, callAccepted]);


    if (!receivingCall || callAccepted) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="glassmorphism-dark p-8 rounded-2xl flex flex-col items-center space-y-6 w-80 shadow-2xl border border-white/10 relative overflow-hidden">
                {/* Ringing Animation Background */}
                <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-3xl animate-blob opacity-50 pointer-events-none"></div>

                {/* Pulsing Ring */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 bg-green-500/30 rounded-full animate-ping"></div>
                    <div className="w-20 h-20 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-3xl text-white font-bold">{callerName?.charAt(0)?.toUpperCase()}</span>
                    </div>
                </div>

                <div className="text-center relative z-10">
                    <h3 className="text-xl font-semibold text-white">{callerName}</h3>
                    <p className="text-slate-300 mt-1">Incoming {callType} call...</p>
                </div>

                <div className="flex space-x-6 relative z-10">
                    {/* Decline */}
                    <button
                        onClick={leaveCall}
                        className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    {/* Answer */}
                    <button
                        onClick={answerCall}
                        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg animate-bounce"
                    >
                        {callType === 'video' ? (
                            <Video className="w-6 h-6 text-white" />
                        ) : (
                            <Phone className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallModal;

