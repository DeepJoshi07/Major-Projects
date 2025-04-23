import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'


export const userDataContext = createContext()


function UserContext({children}) {
    const {serverUrl} = useContext(authDataContext);
    const [editProfile,setEditProfile] = useState(false) 
    const [newPost,setNewPost] = useState(false)
    const [userData,setUserData] = useState(null)
    const [postData,setPostData] = useState(null)
    const [posting,setPosting] = useState(false)

    const getUserData = async()=>{
        try {
            const result = await axios.get(serverUrl + "/user/userdata",{
                withCredentials:true
            })
            setUserData(result.data.user)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const getPost = async()=>{
        try {
            const result = await axios.get(serverUrl + "/data/getpost",{
                withCredentials:true
            })
            
            setPostData(result.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getUserData()
        getPost()
    },[])

    const value ={
        serverUrl,
        userData,
        setUserData,
        getUserData,
        editProfile,
        setEditProfile,
        newPost,setNewPost,
        posting,setPosting,
        postData,setPostData,
        getPost
    }

  return (
   <userDataContext.Provider value={value}>
    {children}
   </userDataContext.Provider>
  )
}

export default UserContext
