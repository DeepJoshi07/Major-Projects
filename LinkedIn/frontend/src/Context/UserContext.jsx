import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'


export const userDataContext = createContext()


function UserContext({children}) {
    const {serverUrl} = useContext(authDataContext);


    const [userData,setUserData] = useState(null)

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

    useEffect(()=>{
        getUserData()
    },[])

    const value ={
        serverUrl,
        userData,
        setUserData,
        getUserData
    }

  return (
   <userDataContext.Provider value={value}>
    {children}
   </userDataContext.Provider>
  )
}

export default UserContext
