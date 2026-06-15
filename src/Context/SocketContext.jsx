import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthProvider";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [user] = useAuth(); // Assuming useAuth returns [user, setUser]

    useEffect(() => {
        if (user) {
            const actualUser = user.user || user.User || user; // Support both Login and Signup payload structures
            
            const socketUrl = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://nextchat-realtimeapplication-backend-3.onrender.com";
            const socketInstance = io(socketUrl, {
                query: {
                    userId: actualUser._id,
                },
            });

            setSocket(socketInstance);

            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socketInstance.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
