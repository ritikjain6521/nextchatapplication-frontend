import React, { useState } from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'
import Status from './Status'
import useConversation from '../../Zustand/useConversation'
// @ts-ignore - Bypassing IDE casing warning on Windows
import ProfileSettingsModal from '../../components/ProfileSettingsModal'
import CreateGroupModal from '../../components/CreateGroupModal'
import CreateChannelModal from '../../components/CreateChannelModal'
import NewChatModal from '../../components/NewChatModal'
import { Settings, MessageSquare, Phone, Users as UsersIcon, Star, Hash, Sparkles, Loader2 } from 'lucide-react'
import useGetAllUser from '../../Context/useGetAllUser.jsx'
import useGetChannels from '../../Context/useGetChannels.js'
import useGetStarredMessages from '../../Context/useGetStarredMessages.js'

const Left = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const [showProfile, setShowProfile] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [showNewChat, setShowNewChat] = useState(false)
  const [activeNav, setActiveNav] = useState('chats')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState('All')
  const [allUser] = useGetAllUser();
  const [channels, channelsLoading, , refetchChannels] = useGetChannels();
  const [starredMessages, starredLoading, refetchStarred] = useGetStarredMessages();

  const navItems = [
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'groups', icon: UsersIcon, label: 'Groups' },
    { id: 'channels', icon: Hash, label: 'Channels' },
    { id: 'ai', icon: Sparkles, label: 'AI Assistant' },
    { id: 'starred', icon: Star, label: 'Starred' },
  ]

  const handlePlusClick = () => {
    if (activeNav === 'groups' || activeFilterTab === 'Groups') {
      setShowCreateGroup(true);
    } else if (activeNav === 'channels') {
      setShowCreateChannel(true);
    } else if (activeNav === 'ai') {
      const { setMessage } = useConversation.getState();
      setMessage([]);
    } else if (activeNav === 'starred') {
      refetchStarred();
    } else {
      setShowNewChat(true);
    }
  };

  const renderChannels = () => {
    if (channelsLoading) return (
      <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" style={{ color: '#7c6af7' }} /></div>
    );
    const filtered = channels.filter(c =>
      !searchQuery || c.groupName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <div className="flex flex-col py-2">
        <div className="px-4 pb-2 shrink-0">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <h2 className="px-5 py-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Channels</h2>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(124,106,247,0.1)' }}>
              <Hash className="w-6 h-6" style={{ color: '#7c6af7' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No channels yet. Create one!</p>
          </div>
        ) : filtered.map(ch => (
          <div key={ch._id}
            className="user-item flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-150 cursor-pointer"
            style={selectedConversation?._id === ch._id ? { background: 'rgba(124,106,247,0.12)', borderLeft: '3px solid #7c6af7' } : {}}
            onClick={() => setSelectedConversation({ ...ch, isChannel: true })}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(124,106,247,0.3), rgba(99,102,241,0.2))', border: '1px solid rgba(124,106,247,0.3)' }}>
              <Hash className="w-5 h-5" style={{ color: '#7c6af7' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate text-white">{ch.groupName}</h3>
              <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{ch.members?.length || 0} subscribers</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStarred = () => {
    if (starredLoading) return (
      <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" style={{ color: '#7c6af7' }} /></div>
    );
    return (
      <div className="flex flex-col py-2 flex-1">
        <h2 className="px-5 py-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Starred Messages</h2>
        {starredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(124,106,247,0.1)' }}>
              <Star className="w-6 h-6" style={{ color: '#7c6af7' }} />
            </div>
            <p className="text-sm text-center px-4" style={{ color: 'var(--text-secondary)' }}>No starred messages yet. Hover a message and click ⭐ to save it.</p>
          </div>
        ) : starredMessages.map((msg, i) => (
          <div key={msg._id || i} className="px-4 py-3 mx-2 rounded-xl mb-1 cursor-default transition-colors hover:bg-white/5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
            <p className="text-sm text-white truncate">{msg.message || '📎 Media attachment'}</p>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ── Desktop: Icon Nav Rail (far left) ── */}
      <div
        className="hidden md:flex flex-col items-center py-4 shrink-0 border-r"
        style={{
          width: '72px',
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {/* Logo */}
        <div className="mb-6 w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c6af7, #6366f1)', boxShadow: '0 0 20px rgba(124,106,247,0.5)' }}>
          <MessageSquare className="w-5 h-5 text-white" />
        </div>

        {/* Nav Icons */}
        <div className="flex flex-col items-center gap-1 flex-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              title={label}
              onClick={() => setActiveNav(id)}
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={activeNav === id
                ? { background: 'linear-gradient(135deg, #7c6af7, #6366f1)', boxShadow: '0 4px 15px rgba(124,106,247,0.5)', color: 'white' }
                : { color: 'var(--text-secondary)' }
              }
              onMouseEnter={e => { if (activeNav !== id) { e.currentTarget.style.background = 'rgba(124,106,247,0.12)'; e.currentTarget.style.color = '#7c6af7'; } }}
              onMouseLeave={e => { if (activeNav !== id) { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Settings */}
        <button
          title="Profile Settings"
          onClick={() => setShowProfile(true)}
          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 mb-2"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,106,247,0.12)'; e.currentTarget.style.color = '#7c6af7'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* ── Chat List Panel ── */}
      <div
        className={`flex flex-col shrink-0 border-r transition-all duration-300 ${
          selectedConversation ? 'hidden md:flex' : 'flex w-full'
        } md:w-[300px] lg:w-[340px]`}
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
      >
        {/* Panel Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-white tracking-tight capitalize">
            {activeNav === 'ai' ? 'AI Assistant' : activeNav}
          </h1>
          <button
            onClick={handlePlusClick}
            title={activeNav === 'channels' ? 'Create Channel' : activeNav === 'groups' ? 'Create Group' : activeNav === 'starred' ? 'Refresh' : 'New Chat'}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ color: '#7c6af7', background: 'rgba(124,106,247,0.1)' }}>
            {activeNav === 'starred' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </button>
        </div>

        {/* Content by Tab */}
        {activeNav === 'chats' ? (
          <>
            <div className="px-4 pb-3 shrink-0">
              <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <div className="shrink-0">
              <Status />
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 shrink-0">
              {['All', 'Unread', 'Groups', 'DM'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`filter-tab ${activeFilterTab === tab ? 'active' : ''}`}
                >
                  {tab}
                  {tab === 'Unread' && (
                    <span className="ml-1.5 badge-count inline-flex" style={{ fontSize: '9px', minWidth: '15px', height: '15px' }}>12</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
              <Users searchQuery={searchQuery} activeFilterTab={activeFilterTab} />
            </div>
          </>

        ) : activeNav === 'ai' ? (
          <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0 px-2 pt-2">
            {/* AI Welcome Card */}
            <div className="mx-2 mb-4 p-4 rounded-2xl border border-white/5" style={{ background: 'linear-gradient(135deg, rgba(124,106,247,0.08), rgba(99,102,241,0.04))' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: '#7c6af7' }} />
                <span className="text-xs font-semibold" style={{ color: '#7c6af7' }}>Powered by Gemini</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Ask me anything! Code help, writing, analysis, math, creative tasks — I'm here 24/7.
              </p>
            </div>
            <div
              className="user-item flex items-center gap-3 px-4 py-3 mx-0 rounded-xl transition-all duration-150 cursor-pointer"
              style={selectedConversation?._id === 'ai_assistant' ? { background: 'rgba(124,106,247,0.12)', borderLeft: '3px solid #7c6af7' } : {}}
              onClick={() => setSelectedConversation({
                _id: 'ai_assistant',
                fullname: 'AI Assistant',
                email: 'Powered by Gemini AI',
                isAI: true,
                profilePhoto: 'https://cdn-icons-png.flaticon.com/512/8649/8649605.png'
              })}
            >
              <div className="relative shrink-0">
                <div className="avatar-ring-green">
                  <div className="w-11 h-11 rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/8649/8649605.png" alt="AI" className="w-full h-full object-cover p-1" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0" style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#22c55e', border: '2px solid var(--bg-secondary)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Assistant</h3>
                <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>Always online · Gemini powered</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0" style={{ background: 'rgba(124,106,247,0.15)', color: '#7c6af7' }}>AI</span>
            </div>
          </div>

        ) : activeNav === 'channels' ? (
          <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
            {renderChannels()}
          </div>

        ) : activeNav === 'starred' ? (
          <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
            {renderStarred()}
          </div>

        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2" style={{ background: 'rgba(124,106,247,0.1)' }}>
              <Phone className="w-8 h-8" style={{ color: '#7c6af7' }} />
            </div>
            <h3 className="text-white font-semibold">Coming Soon</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              The {activeNav} feature is currently under development.
            </p>
          </div>
        )}

        {/* Bottom Logout */}
        <div className="shrink-0" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <Logout />
        </div>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around py-3 px-4"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', display: selectedConversation ? 'none' : undefined }}
      >
        {[
          { icon: MessageSquare, label: 'Chats', id: 'chats', badge: '12' },
          { icon: Hash, label: 'Channels', id: 'channels' },
          { icon: Sparkles, label: 'AI', id: 'ai' },
          { icon: Star, label: 'Starred', id: 'starred' },
          { icon: UsersIcon, label: 'Groups', id: 'groups' },
        ].map(({ icon: Icon, label, id, badge }) => {
          const active = activeNav === id;
          return (
            <button
              key={id}
              className="flex flex-col items-center gap-1 relative"
              onClick={() => setActiveNav(id)}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={active ? { background: 'linear-gradient(135deg, #7c6af7, #6366f1)' } : {}}>
                <Icon className="w-5 h-5" style={{ color: active ? 'white' : 'var(--text-secondary)' }} />
              </div>
              <span className="text-[10px] font-medium" style={{ color: active ? '#7c6af7' : 'var(--text-secondary)' }}>
                {label}
              </span>
              {badge && (
                <span className="absolute -top-1 -right-1 badge-count">{badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {showProfile && <ProfileSettingsModal onClose={() => setShowProfile(false)} />}
      {showCreateGroup && <CreateGroupModal onClose={() => setShowCreateGroup(false)} allUsers={allUser || []} />}
      {showCreateChannel && <CreateChannelModal onClose={() => setShowCreateChannel(false)} allUsers={allUser || []} onChannelCreated={refetchChannels} />}
      {showNewChat && <NewChatModal onClose={() => setShowNewChat(false)} allUsers={allUser || []} />}
    </>
  )
}

export default Left
