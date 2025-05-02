import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from './pages/Login'
import Network from './pages/Network'
import { userDataContext } from './Context/UserContext'
import ProfilePage from './Profile/ProfilePage'

function App() {
  const {userData} = useContext(userDataContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/signup' element={userData?<Navigate to='/'/>:<Signup/>}/>
        <Route path='/login' element={userData?<Navigate to='/'/>:<Login/>}/>
        <Route path='/network' element={userData?<Network/>:<Navigate to="/login"/>}/>
        <Route path='/profilepage' element={userData?<ProfilePage/>:<Navigate to="/login"/>}/>

      </Routes>
    </div>
  )
}

export default App
