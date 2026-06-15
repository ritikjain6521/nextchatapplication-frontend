import { useEffect, useState } from "react";
import axios from "axios";

const useGetGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/group");
                if (res.data) {
                    setGroups(res.data);
                }
            } catch (error) {
                console.error("Error fetching groups:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    return [groups, loading, setGroups];
};

export default useGetGroups;
