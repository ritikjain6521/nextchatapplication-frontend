import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSocket } from "./SocketContext";
import Peer from "simple-peer";
import { useAuth } from "./Authprovider";

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

    // ─── Cleanup helper ───────────────────────────────────────────────────────
    const cleanupCall = (doReload = false) => {
        if (connectionRef.current) {
            connectionRef.current.destroy();
            connectionRef.current = null;
        }
        setCallAccepted(false);
        setCallEnded(false);
        setReceivingCall(false);
        setIsCalling(false);
        setRemoteStream(null);
        setCaller("");
        setCallerSignal(null);
        setIdToCall("");
        if (stream) {
            stream.getTracks().forEach((t) => t.stop());
            setStream(null);
        }
        if (doReload) window.location.reload();
    };

    // ─── Socket listeners (stable, in useEffect) ─────────────────────────────
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
            if (connectionRef.current) {
                connectionRef.current.signal(signal);
            }
        };

        const onCallEnded = () => {
            cleanupCall(true);
        };

        socket.on("callUser", onCallUser);
        socket.on("callAccepted", onCallAccepted);
        socket.on("callEnded", onCallEnded);

        return () => {
            socket.off("callUser", onCallUser);
            socket.off("callAccepted", onCallAccepted);
            socket.off("callEnded", onCallEnded);
        };
    }, [socket]);   // Only re-run when socket changes

    // ─── Assign local stream to video element when both are ready ─────────────
    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    // ─── Assign remote stream to video element when both are ready ────────────
    useEffect(() => {
        if (userVideo.current && remoteStream) {
            userVideo.current.srcObject = remoteStream;
        }
    }, [remoteStream, callAccepted]);

    // ─── Get camera/mic ───────────────────────────────────────────────────────
    const getMediaStream = async (type = "video") => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                video: type === "video",
                audio: true,
            });
            setStream(s);
            return s;
        } catch (err) {
            console.error("getUserMedia error:", err);
            alert("Could not access camera/microphone. Please check permissions.");
            return null;
        }
    };

    // ─── Initiate a call ──────────────────────────────────────────────────────
    const callUser = async (targetId, type = "video") => {
        setCallType(type);
        setIdToCall(targetId);

        const currentStream = await getMediaStream(type);
        if (!currentStream) return;

        setIsCalling(true);

        const actualUser = user?.user || user?.User || user;

        const peer = new Peer({
            initiator: true,
            trickle: false,
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

        connectionRef.current = peer;
    };

    // ─── Answer an incoming call ──────────────────────────────────────────────
    const answerCall = async () => {
        setCallAccepted(true);
        setReceivingCall(false);

        const currentStream = await getMediaStream(callType);
        if (!currentStream) return;

        const peer = new Peer({
            initiator: false,
            trickle: false,
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

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    // ─── End the call ─────────────────────────────────────────────────────────
    const leaveCall = () => {
        const target = caller || idToCall;
        if (target) {
            socket.emit("endCall", { to: target });
        }
        cleanupCall(true);
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
