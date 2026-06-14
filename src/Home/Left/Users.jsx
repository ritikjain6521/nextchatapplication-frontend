import React from 'react'
import User from './User'
import useGetAllUser from '../../Context/useGetAllUser.jsx'

const Users = () => {
    const [allUser, loading]= useGetAllUser();
    
    return (
        <div className="flex flex-col h-full">
            <h1 className="px-6 py-3 text-slate-400 text-xs font-bold uppercase tracking-wider bg-transparent">Direct Messages</h1>
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
                {allUser.map((user,index)=>(
                    <User key={index} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default Users
