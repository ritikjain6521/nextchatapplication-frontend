import { useState } from "react";
import useConversation from "../Zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messageText, setMessage, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
            // API returns { message: "...", messageData: {...} }
            setMessage([...(Array.isArray(messageText) ? messageText : messageText.messageText || []), res.data.messageData]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
