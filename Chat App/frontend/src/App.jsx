import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import Navbar from './components/Navbar'
import {useAuthStore} from './store/useAuthStore'
import {useThemeStore} from './store/useThemeStore'
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";

function App() {
  const {authUser,checkAuth, isCheckingAuth,onlineUsers} = useAuthStore()
  console.log(onlineUsers)
  const {theme} = useThemeStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to='/login'/>}/>
        <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to='/'/>}/>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to='/'/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
