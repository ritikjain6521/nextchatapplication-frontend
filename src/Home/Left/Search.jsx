import React from 'react'
import { Search as SearchIcon } from "lucide-react";

function Search() {
  return (
   <div className="p-4 border-b border-white/5">
     <div className="relative group">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <SearchIcon className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors duration-300" />
       </div>
       <input 
         type="text" 
         className="w-full bg-white/5 border border-white/10 text-white rounded-full pl-10 pr-4 py-2.5 outline-none focus:bg-white/10 focus:border-brand-primary/50 transition-all duration-300 placeholder-slate-400 shadow-inner" 
         placeholder="Search contacts..." 
       />
     </div>
   </div>
  )
}

export default Search
