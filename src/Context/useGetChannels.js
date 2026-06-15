import { useEffect, useState } from "react";
import axios from "axios";

const useGetChannels = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchChannels = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/channel");
            if (res.data) setChannels(res.data);
        } catch (error) {
            console.error("Error fetching channels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    return [channels, loading, setChannels, fetchChannels];
};

export default useGetChannels;
