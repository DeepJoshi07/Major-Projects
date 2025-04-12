import React, { useContext } from 'react'
import { FaPlus } from "react-icons/fa6";
import dp from "../assets/dp.png"
import { MdOutlineCameraAlt } from "react-icons/md";
import { userDataContext } from '../Context/UserContext';

function Profile() {
    const {userData,setEditProfile} = useContext(userDataContext)
    

  return (
    <div className='w-full  lg:w-[25%]  mt-[100px] relative shadow-lg p-[10px] rounded-lg  bg-white '>
      
      <div onClick={()=>setEditProfile(true)} className='w-full h-[120px] relative bg-gray-400 rounded-lg'>
        <img src={userData.coverImage?userData.coverImage:null} className="w-full h-full rounded-lg" alt="" />
        <div className=' absolute text-white top-[20px] right-[20px]'>
        <MdOutlineCameraAlt className='cursor-pointer text-3xl'/>
        </div>
      </div>
      <div onClick={()=>setEditProfile(true)} className='cursor-pointer absolute top-[80px] left-[40px] h-[70px] w-[70px] overflow-hidden bg-black rounded-full'>
        <img src={userData.profileImage?userData.profileImage:dp} alt="" className='w-full h-full' />
        
      </div>
      <div className='absolute cursor-pointer h-[25px] w-[25px] rounded-full top-[125px] left-[90px] text-white bg-[#0a66c2] flex justify-center items-center'><FaPlus /></div>
        <div className='mt-[30px] px-[30px] font-semibold flex flex-col justify-center'>
            <div className='text-[20px]'>{userData.firstName+" "}{userData.lastName}</div>
            <div>{userData.headline?userData.headline:""}</div>
            <div className='text-[14px]'>{userData.location?userData.location:""}</div>
        </div>
        <button onClick={()=>setEditProfile(true)} className="w-[100%] h-[50px] rounded-full text-[#0a66c2] font-semibold my-[20px] border-2 border-[#0a66c2] cursor-pointer">Edit Profile</button>
    </div>
  )
}

export default Profile
