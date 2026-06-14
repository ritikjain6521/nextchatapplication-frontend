import { useEffect } from "react";
import { useSocket } from "./SocketContext";
import useConversation from "../Zustand/useConversation.js";

// Facebook Messenger-style "ding ding" notification sound
const playNotificationSound = () => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();

        const playTone = (freq, startTime, duration, gain = 0.4) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.start(startTime);
            osc.stop(startTime + duration);
        };

        const now = ctx.currentTime;
        // Messenger ding: two ascending tones
        playTone(1046.5, now,        0.18); // C6
        playTone(1318.5, now + 0.12, 0.22); // E6
    } catch (e) {
        console.error("Audio API error:", e);
    }
};


const useGetSocketMessage = () => {
    const { socket } = useSocket();
    const { messageText, setMessage } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            playNotificationSound();
            const currentMessages = Array.isArray(messageText) ? messageText : messageText.messageText || [];
            setMessage([...currentMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, messageText, setMessage]);
};

export default useGetSocketMessage;
