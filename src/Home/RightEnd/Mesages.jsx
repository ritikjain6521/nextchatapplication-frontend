import React, { useEffect, useRef } from 'react'

import useGetMessage from '../../Context/usegetMessage.js';
import Message from './Message.jsx';
import Loading from '../../components/Loading.jsx';
import useGetSocketMessage from '../../Context/useGetSocketMessage.js';

function Mesages() {
    const {loading, messageText} = useGetMessage();
    useGetSocketMessage(); // Listen for incoming messages

    const messages = Array.isArray(messageText) ? messageText : messageText.messageText || [];
    const lastMsgRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 py-2 min-h-full flex flex-col justify-end'>
            {loading ? (
                <div className="flex justify-center items-center h-full"><Loading/></div>
            ) : ( 
                messages.length > 0 && messages.map((message, index) => (
                    <div key={message._id} ref={index === messages.length - 1 ? lastMsgRef : null}>
                        <Message message={message} />
                    </div>
                ))
            )}
        
            {!loading && messages.length === 0 && (
                <div className="flex justify-center items-center h-full">
                    <p className='text-center text-slate-400'>Say! Hello to start the conversation</p>
                </div>
            )}
        </div>
    )
}

export default Mesages
