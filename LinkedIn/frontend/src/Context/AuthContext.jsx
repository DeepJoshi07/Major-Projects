import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {
    let serverUrl = "https://linkedin-backend-5tew.onrender.com"
    let value ={
        serverUrl,
    }
  return (
    <authDataContext.Provider value={value} >
        {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
