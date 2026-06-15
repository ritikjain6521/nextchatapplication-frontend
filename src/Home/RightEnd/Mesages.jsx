import React, { useEffect, useRef } from 'react'
import useGetMessage from '../../Context/useGetMessage.js';
import Message from './Message.jsx';
import useGetSocketMessage from '../../Context/useGetSocketMessage.js';
import { Loader2 } from 'lucide-react';

function Mesages({ searchMessage }) {
    const {loading, messageText} = useGetMessage();
    useGetSocketMessage(); // Listen for incoming messages

    const messages = Array.isArray(messageText) ? messageText : messageText.messageText || [];
    const lastMsgRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    // Group messages by date (simplified placeholder for date dividers)
    const renderDateDivider = (text) => (
        <div className="flex items-center justify-center my-6">
            <span className="px-4 py-1 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>
                {text}
            </span>
        </div>
    );

    const filteredMessages = searchMessage
      ? messages.filter(m => m.message && m.message.toLowerCase().includes(searchMessage.toLowerCase()))
      : messages;

    return (
        <div className='flex flex-col flex-1 h-full min-h-0' style={{ background: 'var(--bg-primary)' }}>
            <div className='flex-1 overflow-y-auto scrollbar-thin px-2 md:px-6 py-4 flex flex-col justify-start'>
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-brand-primary opacity-60">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-sm font-medium tracking-wide">Loading messages...</span>
                    </div>
                ) : (
                    <>
                        {filteredMessages.length > 0 && renderDateDivider("Today")}
                        {filteredMessages.length > 0 && filteredMessages.map((message, index) => (
                            <div key={message._id || index} ref={index === filteredMessages.length - 1 ? lastMsgRef : null}>
                                <Message message={message} />
                            </div>
                        ))}
                    </>
                )}
            
                {!loading && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-2" style={{ background: 'rgba(124,106,247,0.1)' }}>
                            <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">No messages yet</h3>
                        <p className='text-center text-sm max-w-[250px]' style={{ color: 'var(--text-secondary)' }}>
                            Send a message to start the conversation securely.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Mesages
