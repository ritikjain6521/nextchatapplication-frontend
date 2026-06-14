import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function useGetAllUser() {
    const [allUser,setalluser]=useState([])
    const [loading, setloading]=useState(false)
    
   useEffect(()=>{
   const getUser= async()=>{
    try {
        const token= Cookies.get("jwt")
        const response = await axios.get("/api/User/alluser",{
         Credentials:"include",
         headers:{

            Authorization:`Bearer ${token}`
         }

        })
        setalluser(response.data);
        setloading(false)
        
    } catch (error) {
        console.log("Error in useGetAllUser:"+error)
    }






   }
   getUser()


   },[])
   return[allUser,loading]
}

export default useGetAllUser
