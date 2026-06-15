import React from 'react'
import useConversation from '../../Zustand/useConversation.js'
import { useSocket } from '../../Context/SocketContext.jsx'

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocket();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

  return (
    <div
      className="user-item flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-150"
      style={isSelected ? {
        background: 'rgba(124,106,247,0.12)',
        borderLeft: '3px solid #7c6af7',
      } : {}}
      onClick={() => setSelectedConversation(user)}
    >
      {/* Avatar with online ring */}
      <div className="relative shrink-0">
        <div className={isOnline ? 'avatar-ring-green' : 'avatar-ring-grey'}>
          <div className="w-11 h-11 rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
            <img
              src={user?.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
              alt={user.fullname}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp"; }}
            />
          </div>
        </div>
        {/* Online dot */}
        <span
          className="absolute bottom-0 right-0"
          style={{
            width: '11px', height: '11px',
            borderRadius: '50%',
            background: isOnline ? '#22c55e' : '#475569',
            border: '2px solid var(--bg-secondary)',
            boxShadow: isOnline ? '0 0 6px rgba(34,197,94,0.5)' : 'none',
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
            {user.isGroup ? user.groupName : user.fullname}
          </h3>
          <span className="text-[11px] shrink-0 ml-2" style={{ color: 'var(--text-muted)' }}>
            {user.isGroup ? `${user.members?.length || 0} members` : (isOnline ? 'Online' : '')}
          </span>
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {user.isGroup ? 'Group Chat' : user.email}
        </p>
      </div>

      {/* Unread Badge (placeholder - can be made dynamic) */}
      {isSelected && (
        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#7c6af7' }} />
      )}
    </div>
  );
}

export default User;
