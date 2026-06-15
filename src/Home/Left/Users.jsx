import React from 'react'
import User from './User'
import useGetAllUser from '../../Context/useGetAllUser.jsx'
import useGetGroups from '../../Context/useGetGroups.js'

const Users = ({ searchQuery = '', activeFilterTab = 'All' }) => {
    const [allUser, loading] = useGetAllUser();
    const [groups, groupsLoading] = useGetGroups();

    if (loading || groupsLoading) {
        return (
            <div className="flex flex-col gap-3 p-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-2 py-1 animate-pulse">
                        <div className="w-12 h-12 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.07)' }} />
                        <div className="flex-1 space-y-2">
                            <div className="h-3.5 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.07)' }} />
                            <div className="h-3 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
                        </div>
                        <div className="h-3 w-8 rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    </div>
                ))}
            </div>
        );
    }

    // Apply filtering logic
    let filteredItems = (activeFilterTab === 'Groups') ? groups : allUser;
    
    filteredItems = filteredItems.filter((item) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        if (item.isGroup) {
            return item.groupName?.toLowerCase().includes(query);
        }
        return item.fullname?.toLowerCase().includes(query) || item.email?.toLowerCase().includes(query);
    });

    if (activeFilterTab === 'Unread') {
        filteredItems = []; 
    }

    return (
        <div className="flex flex-col py-2">
            <h2 className="px-5 py-2 text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}>
                {activeFilterTab === 'Groups' ? 'Groups' : 'Direct Messages'}
            </h2>
            {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: 'rgba(124,106,247,0.1)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" style={{ color: '#7c6af7' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {searchQuery ? 'No contacts found' : (activeFilterTab === 'Groups' ? 'No groups found' : 'No unread messages')}
                    </p>
                </div>
            ) : (
                filteredItems.map((item, index) => (
                    <User key={item._id || index} user={item} />
                ))
            )}
        </div>
    )
}

export default Users
