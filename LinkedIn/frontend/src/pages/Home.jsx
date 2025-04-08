import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import Navbar from '../components/Navbar.jsx'

function Home() {
  const {userData} = useContext(userDataContext)
  
  
  return (
    <div className='w-full h-screen bg-[#f0efe7]'>
      <Navbar/>
    </div>
  )
}

export default Home
