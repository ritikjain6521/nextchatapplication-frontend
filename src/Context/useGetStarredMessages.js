import { useEffect, useState } from "react";
import axios from "axios";

const useGetStarredMessages = () => {
    const [starredMessages, setStarredMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStarred = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/message/starred");
            if (res.data) setStarredMessages(res.data);
        } catch (error) {
            console.error("Error fetching starred messages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStarred();
    }, []);

    return [starredMessages, loading, fetchStarred];
};

export default useGetStarredMessages;
