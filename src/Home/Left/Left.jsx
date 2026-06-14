import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'
import Status from './Status'
import useConversation from '../../Zustand/useConversation'

const Left = () => {
  const { selectedConversation } = useConversation()

  return (
    <div className={`bg-[#09090b]/80 backdrop-blur-md border-r border-white/10 text-white flex-col shadow-2xl transition-all duration-300 ${
      selectedConversation ? 'hidden md:flex md:w-[320px] lg:w-[380px]' : 'flex w-full md:w-[320px] lg:w-[380px]'
    }`}>
      <Search/>
      <Status/>
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2" style={{ minHeight: "calc(84vh - 10vh)" }}>
        <Users/>
      </div>
      <Logout/>
    </div>
  )
}

export default Left
