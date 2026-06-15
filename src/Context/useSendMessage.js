import { useState } from "react";
import useConversation from "../Zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messageText, setMessage, selectedConversation } = useConversation();

    const sendMessage = async (data) => {
        setLoading(true);
        try {
            let res;
            const isAI = selectedConversation.isAI;
            const endpoint = isAI ? '/api/ai/chat' : `/api/message/send/${selectedConversation._id}`;

            if (typeof data === 'object' && data.file) {
                // File upload
                const formData = new FormData();
                formData.append('message', data.message || '');
                formData.append('media', data.file);
                
                res = await axios.post(endpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Regular text message
                const msgText = typeof data === 'object' ? data.message : data;
                res = await axios.post(endpoint, { message: msgText });
            }

            // For AI, we need to add our own message to the state FIRST, 
            // then add the AI's response which comes back in res.data.messageData
            if (isAI) {
                let authUserId = "me";
                try {
                    const authStr = localStorage.getItem("user");
                    if (authStr) {
                        const parsed = JSON.parse(authStr);
                        // Support both Login {user:{_id}} and Signup {User:{_id}} shapes
                        const u = parsed?.user || parsed?.User || parsed;
                        if (u && u._id) authUserId = u._id;
                    }
                } catch (e) {}

                const myMsg = {
                    _id: "me_" + Date.now(),
                    senderId: authUserId,
                    receiverId: 'ai_assistant',
                    message: typeof data === 'object' ? data.message : data,
                    createdAt: new Date().toISOString()
                };
                // Adding both messages to the state
                const currentMessages = Array.isArray(messageText) ? messageText : messageText.messageText || [];
                setMessage([...currentMessages, myMsg, res.data.messageData]);
            } else {
                // Standard chat update
                setMessage([...(Array.isArray(messageText) ? messageText : messageText.messageText || []), res.data.messageData]);
            }

        } catch (error) {
            console.error("Error sending message:", error);
            if (error.response && error.response.status === 403) {
                alert(error.response.data.message || "Failed to send: Blocked");
            }
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
