import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useSocket } from "./SocketContext";
import Peer from "simple-peer";
import { useAuth } from "./AuthProvider";
import axios from "axios";

const CallContext = createContext();

export const useCall = () => {
    return useContext(CallContext);
};

// STUN servers are essential for WebRTC to work across different networks
const ICE_SERVERS = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
    ],
};

// ─── Plan call limits (minutes) ──────────────────────────────────────────────
const PLAN_LIMITS = {
    Free: 5,
    Pro: 10,
    Team: 30,
    Enterprise: 30,
};

const RING_TIMEOUT_MS = 120000; // 2 minutes

export const CallProvider = ({ children }) => {
    const { socket } = useSocket();
    const [user] = useAuth();

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerName, setCallerName] = useState("");
    const [callerSignal, setCallerSignal] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
    const [callType, setCallType] = useState("video");
    const [idToCall, setIdToCall] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const streamRef = useRef(null);     // Always-current stream reference
    const ringTimerRef = useRef(null);  // Ring timeout timer
    const planTimerRef = useRef(null);  // Plan duration timer

    // Keep streamRef in sync
    useEffect(() => {
        streamRef.current = stream;
    }, [stream]);

    // ─── Cleanup helper (uses ref so it's never stale) ───────────────────────
    const cleanupCall = useCallback(() => {
        // Clear timers
        if (ringTimerRef.current) { clearTimeout(ringTimerRef.current); ringTimerRef.current = null; }
        if (planTimerRef.current) { clearTimeout(planTimerRef.current); planTimerRef.current = null; }

        if (connectionRef.current) {
            try { connectionRef.current.destroy(); } catch (_) {}
            connectionRef.current = null;
        }

        // Stop all media tracks via ref (avoids stale closure)
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }

        setCallAccepted(false);
        setCallEnded(true);
        setReceivingCall(false);
        setIsCalling(false);
        setRemoteStream(null);
        setStream(null);
        setCaller("");
        setCallerName("");
        setCallerSignal(null);
        setIdToCall("");

        if (myVideo.current) myVideo.current.srcObject = null;
        if (userVideo.current) userVideo.current.srcObject = null;
    }, []);

    // ─── Socket listeners ────────────────────────────────────────────────────
    useEffect(() => {
        if (!socket) return;

        const onCallUser = ({ from, name, signal }) => {
            setReceivingCall(true);
            setCaller(from);
            setCallerName(name);
            setCallerSignal(signal);
        };

        const onCallAccepted = (signal) => {
            setCallAccepted(true);
            setIsCalling(false);
            if (connectionRef.current) {
                try {
                    connectionRef.current.signal(signal);
                } catch (err) {
                    console.error("Error signaling peer:", err);
                }
            }
        };

        const onCallEnded = () => {
            cleanupCall();
        };

        const onCallRejected = ({ reason }) => {
            alert(reason || "Call was rejected");
            cleanupCall();
        };

        socket.on("callUser", onCallUser);
        socket.on("callAccepted", onCallAccepted);
        socket.on("callEnded", onCallEnded);
        socket.on("callRejected", onCallRejected);

        return () => {
            socket.off("callUser", onCallUser);
            socket.off("callAccepted", onCallAccepted);
            socket.off("callEnded", onCallEnded);
            socket.off("callRejected", onCallRejected);
        };
    }, [socket, cleanupCall]);

    // ─── Ring Timeout (2 min) ────────────────────────────────────────────────
    useEffect(() => {
        if (ringTimerRef.current) { clearTimeout(ringTimerRef.current); ringTimerRef.current = null; }

        if ((isCalling || receivingCall) && !callAccepted) {
            ringTimerRef.current = setTimeout(() => {
                console.log("Ring timeout – auto ending call");
                // We inline the end-call logic here to avoid stale leaveCall references
                if (socket) {
                    // Try to send missed call message
                    // We use functional approach – no stale closures
                    setIdToCall((prevId) => {
                        setCaller((prevCaller) => {
                            const target = prevCaller || prevId;
                            if (target) {
                                axios.post(`/api/message/send/${target}`, {
                                    message: `📞 Missed ${callType === 'video' ? 'Video' : 'Voice'} Call`
                                }).catch(() => {});
                                socket.emit("endCall", { to: target });
                            }
                            return "";
                        });
                        return "";
                    });
                }
                cleanupCall();
            }, RING_TIMEOUT_MS);
        }

        return () => {
            if (ringTimerRef.current) { clearTimeout(ringTimerRef.current); ringTimerRef.current = null; }
        };
    }, [isCalling, receivingCall, callAccepted, socket, callType, cleanupCall]);

    // ─── Plan Duration Timeout ───────────────────────────────────────────────
    useEffect(() => {
        if (planTimerRef.current) { clearTimeout(planTimerRef.current); planTimerRef.current = null; }

        if (callAccepted) {
            const actualUser = user?.user || user?.User || user || {};
            const plan = actualUser.plan || 'Free';
            const durationMinutes = PLAN_LIMITS[plan] || 5;

            console.log(`Call accepted – ${plan} plan, ${durationMinutes}m limit`);

            planTimerRef.current = setTimeout(() => {
                alert(`Call limit of ${durationMinutes} minutes reached for your ${plan} plan. The call will now end.`);
                // Inline end logic
                if (socket) {
                    setIdToCall((prevId) => {
                        setCaller((prevCaller) => {
                            const target = prevCaller || prevId;
                            if (target) socket.emit("endCall", { to: target });
                            return "";
                        });
                        return "";
                    });
                }
                cleanupCall();
            }, durationMinutes * 60 * 1000);
        }

        return () => {
            if (planTimerRef.current) { clearTimeout(planTimerRef.current); planTimerRef.current = null; }
        };
    }, [callAccepted, user, socket, cleanupCall]);

    // ─── Assign local stream to video element ────────────────────────────────
    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    // ─── Assign remote stream to video element ──────────────────────────────
    useEffect(() => {
        if (userVideo.current && remoteStream) {
            userVideo.current.srcObject = remoteStream;
        }
    }, [remoteStream, callAccepted]);

    // ─── Get camera/mic ──────────────────────────────────────────────────────
    const getMediaStream = async (type = "video") => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                video: type === "video",
                audio: true,
            });
            setStream(s);
            streamRef.current = s;
            return s;
        } catch (err) {
            console.error("getUserMedia error:", err);
            alert("Could not access camera/microphone. Please check permissions.");
            return null;
        }
    };

    // ─── Initiate a call ─────────────────────────────────────────────────────
    const callUser = async (targetId, type = "video") => {
        // Reset callEnded so VideoCallRoom shows
        setCallEnded(false);
        setCallType(type);
        setIdToCall(targetId);

        const currentStream = await getMediaStream(type);
        if (!currentStream) return;

        setIsCalling(true);

        const actualUser = user?.user || user?.User || user;

        const peer = new Peer({
            initiator: true,
            trickle: false,  // Single signal exchange – simpler, more reliable
            stream: currentStream,
            config: ICE_SERVERS,
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: targetId,
                signalData: data,
                from: actualUser._id,
                name: actualUser.fullname,
            });
        });

        peer.on("stream", (remoteS) => {
            setRemoteStream(remoteS);
        });

        peer.on("error", (err) => {
            console.error("Peer error (caller):", err);
        });

        peer.on("close", () => {
            console.log("Peer connection closed (caller)");
        });

        connectionRef.current = peer;
    };

    // ─── Answer an incoming call ─────────────────────────────────────────────
    const answerCall = async () => {
        setCallEnded(false);
        setCallAccepted(true);
        setReceivingCall(false);

        const currentStream = await getMediaStream(callType);
        if (!currentStream) return;

        const peer = new Peer({
            initiator: false,
            trickle: false,  // Single signal exchange – simpler, more reliable
            stream: currentStream,
            config: ICE_SERVERS,
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });

        peer.on("stream", (remoteS) => {
            setRemoteStream(remoteS);
        });

        peer.on("error", (err) => {
            console.error("Peer error (answerer):", err);
        });

        peer.on("close", () => {
            console.log("Peer connection closed (answerer)");
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    // ─── End the call ────────────────────────────────────────────────────────
    const leaveCall = async () => {
        const target = caller || idToCall;

        // If the call was never accepted, treat it as a missed call
        if (target && !callAccepted) {
            try {
                await axios.post(`/api/message/send/${target}`, {
                    message: `📞 Missed ${callType === 'video' ? 'Video' : 'Voice'} Call`
                });
            } catch (error) {
                console.error("Failed to log missed call:", error);
            }
        }

        if (target && socket) {
            socket.emit("endCall", { to: target });
        }
        cleanupCall();
    };

    return (
        <CallContext.Provider
            value={{
                callAccepted,
                myVideo,
                userVideo,
                stream,
                remoteStream,
                callerName,
                callEnded,
                callUser,
                leaveCall,
                answerCall,
                receivingCall,
                isCalling,
                callType,
                setCallType,
            }}
        >
            {children}
        </CallContext.Provider>
    );
};
