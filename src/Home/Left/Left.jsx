import React, { useState } from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'
import Status from './Status'
import useConversation from '../../Zustand/useConversation'
import ProfileSettingsModal from '../../components/ProfileSettingsModal'
import { Settings } from 'lucide-react'

const Left = () => {
  const { selectedConversation } = useConversation()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className={`bg-[#09090b]/80 backdrop-blur-md border-r border-white/10 text-white flex-col shadow-2xl transition-all duration-300 ${
      selectedConversation ? 'hidden md:flex md:w-[320px] lg:w-[380px]' : 'flex w-full md:w-[320px] lg:w-[380px]'
    }`}>
      <Search/>
      <Status/>
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2" style={{ minHeight: "calc(84vh - 10vh)" }}>
        <Users/>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-2 py-1">
        <button
          onClick={() => setShowProfile(true)}
          className="p-3 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Profile Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        <Logout/>
      </div>
      {showProfile && <ProfileSettingsModal onClose={() => setShowProfile(false)} />}
    </div>
  )
}

export default Left
