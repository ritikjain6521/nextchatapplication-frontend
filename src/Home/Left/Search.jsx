import React from 'react'
import { Search as SearchIcon } from "lucide-react";

function Search({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-200"
        placeholder="Search messages or users"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-primary)',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(124,106,247,0.5)';
          e.target.style.background = 'rgba(255,255,255,0.07)';
          e.target.style.boxShadow = '0 0 0 3px rgba(124,106,247,0.1)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--border-subtle)';
          e.target.style.background = 'rgba(255,255,255,0.05)';
          e.target.style.boxShadow = '';
        }}
      />
    </div>
  )
}

export default Search
