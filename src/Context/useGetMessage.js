import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useConversation from '../Zustand/useConversation.js';
import axios from 'axios';

const useGetMessage = () => {
    const [loading,setLoading]=useState(false)
    const {messageText, setMessage, selectedConversation}= useConversation()

    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true)
            if(selectedConversation && selectedConversation._id) {
                 try{
                const res=await axios.get(`/api/message/get/${selectedConversation._id}`)
                setMessage(res.data)
                setLoading(false)

            }
            catch(error){
                console.log(error)
            }





            }
           
        }

        getMessages()

     } ,[selectedConversation,setMessage ])
  return  {loading,messageText}

}

export default useGetMessage
