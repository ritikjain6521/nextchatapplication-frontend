 import { create } from 'zustand'

const useConversation =create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
 
  messageText:[],
    setMessage:(messageText)=>set({messageText}),

}))
export default useConversation;
