import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';


export const userDataContext = createContext()


function UserContext({children}) {
    const {serverUrl} = useContext(authDataContext);
    const [edit,setEdit] = useState(false) 
    const [newPost,setNewPost] = useState(false)
    const [userData,setUserData] = useState(null)
    const [postData,setPostData] = useState(null)
    const [posting,setPosting] = useState(false)
    const [profileData,setProfileData] = useState([])
    const navigate = useNavigate()


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
    const handleGetProfile = async(username)=>{
        try {
            let result = await axios.get(serverUrl+`/user/userprofile/${username}`,{withCredentials:true})
            setProfileData(result.data)
            getPost()
            navigate('/profilepage')
        } catch (error) {
            console.log(error)
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
        edit,
        setEdit,
        newPost,setNewPost,
        posting,setPosting,
        postData,setPostData,
        getPost,
        profileData,setProfileData,
        handleGetProfile
    }

  return (
   <userDataContext.Provider value={value}>
    {children}
   </userDataContext.Provider>
  )
}

export default UserContext
