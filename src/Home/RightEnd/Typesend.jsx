import React, { useState, useRef } from 'react'
import { Send, Smile, Paperclip, Mic, X, Square, Lock } from "lucide-react";
import useSendMessage from '../../Context/useSendMessage.js';
import EmojiPicker from 'emoji-picker-react';
// @ts-ignore
import { useAuth } from '../../Context/AuthProvider';
import useConversation from '../../Zustand/useConversation';

function Typesend() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const { loading, sendMessage } = useSendMessage();
  const [authUser] = useAuth();
  const { selectedConversation } = useConversation();
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Channel admin check: only admins can post in channels
  const isChannel = selectedConversation?.isChannel;
  const actualUser = authUser?.user || authUser?.User || authUser;
  const isChannelAdmin = isChannel && selectedConversation?.groupAdmin?.toString() === actualUser?._id?.toString();
  const cannotPost = isChannel && !isChannelAdmin;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!message.trim() && !selectedFile) return;
    
    if (selectedFile) {
        await sendMessage({ message, file: selectedFile });
    } else {
        await sendMessage(message);
    }
    
    setMessage("");
    setSelectedFile(null);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], `voice_memo_${Date.now()}.webm`, { type: 'audio/webm' });
        setSelectedFile(audioFile);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      console.error("Error accessing mic:", err);
      alert("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isUploadable = message.trim() || selectedFile;

  // Render read-only banner for non-admin channel members
  if (cannotPost) {
    return (
      <div className="flex-none shrink-0 px-4 md:px-6 py-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-2xl mx-auto max-w-4xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <Lock className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Only channel admins can post here. You can read messages.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-none shrink-0 px-4 md:px-6 py-4 relative" style={{ background: 'var(--bg-primary)' }}>
      
      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-full mb-2 left-6 z-50 shadow-2xl rounded-2xl overflow-hidden border border-white/10">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick} 
            theme="dark"
            autoFocusSearch={false}
          />
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-2 mx-auto max-w-4xl'
      >
        {/* File Preview Area */}
        {selectedFile && (
          <div className="flex items-center gap-3 p-3 rounded-2xl w-max" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: 'rgba(124,106,247,0.1)' }}>
               {selectedFile.type.startsWith('image/') ? (
                 <img src={URL.createObjectURL(selectedFile)} alt="preview" className="w-full h-full object-cover rounded-xl" />
               ) : selectedFile.type.startsWith('audio/') ? (
                 <Mic className="w-5 h-5" style={{ color: '#7c6af7' }} />
               ) : (
                 <Paperclip className="w-5 h-5" style={{ color: '#7c6af7' }} />
               )}
            </div>
            <div className="flex flex-col max-w-[200px]">
              <span className="text-sm text-white truncate font-medium">{selectedFile.name}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => setSelectedFile(null)} 
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl w-full" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          
          <button 
            type="button" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full transition-all shrink-0"
            style={{ color: showEmojiPicker ? 'var(--brand-primary)' : 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = showEmojiPicker ? 'var(--brand-primary)' : 'var(--text-secondary)'; }}
          >
            <Smile className='w-[18px] h-[18px]'/>
          </button>
          
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full transition-all shrink-0 hidden sm:block"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Paperclip className='w-[18px] h-[18px]'/>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

          <div className='flex-1 mx-1'>
            {isRecording ? (
               <div className="flex items-center gap-3 text-red-400 animate-pulse font-medium text-sm pl-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                 Recording {formatTime(recordingTime)}
               </div>
            ) : (
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setShowEmojiPicker(false)}
                className="bg-transparent placeholder-slate-500 outline-none w-full text-[15px]"
                style={{ color: 'var(--text-primary)' }}
              />
            )}
          </div>

          {isRecording ? (
             <button 
               type="button" 
               onClick={stopRecording}
               className="p-2 rounded-full transition-all shrink-0 text-red-500 hover:bg-red-500/10"
             >
               <Square className='w-[18px] h-[18px] fill-current'/>
             </button>
          ) : (
            <button 
              type="button" 
              onClick={startRecording}
              className="p-2 rounded-full transition-all shrink-0 hidden sm:block"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <Mic className='w-[18px] h-[18px]'/>
            </button>
          )}
          
          <button 
            type="submit" 
            disabled={loading || (!isUploadable)}
            className={`w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center shrink-0 ${isUploadable ? 'scale-105' : ''}`}
            style={isUploadable 
              ? { background: 'linear-gradient(135deg, #7c6af7, #6366f1)', color: 'white', boxShadow: '0 4px 15px rgba(124,106,247,0.4)' } 
              : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }
            }
          >
            <Send className='w-[18px] h-[18px] ml-0.5'/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Typesend
