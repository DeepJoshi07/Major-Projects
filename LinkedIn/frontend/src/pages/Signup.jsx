import React, { useState } from "react";
import logo from "../assets/logo.svg";

// #0a66c2
function Signup() {
    const [show,setShow] = useState(true);
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <div className="w-full p-[30px] lg:p-[35px]">
        <img src={logo} alt="" />
      </div>
     
        <form action="" className="w-[90%] max-w-[400px] h-[600px] gap-[10px] p-[15px] border-none md:shadow-xl flex flex-col justify-center ">
            <h2 className="text-3xl text-gray-800 mb-[30px] font-semibold">Sign Up</h2>
          <input type="text"  placeholder="FirstName" className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] focus:border-blue-500 focus:outline-none rounded-md"/>
          <input type="text" placeholder="LastName" className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"/>
          <input type="text" placeholder="UserName" className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"/>
          <input type="email" placeholder="Email" className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"/>
          <div className="h-[50px] w-[100%] relative border-2 border-gray-600 text-gray-800 text-[18px] border-none rounded-md">
          <span className="absolute mt-[10px] ml-[300px] text-[#0a66c2] cursor-pointer" onClick={()=>setShow((prev)=>!prev)}>{show?"hidden":"show"}</span>
          <input type={show?"text":"password"} placeholder="Password" className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"/>
          </div>
          
          <button className="w-[100%] h-[50px] rounded-full text-white font-semibold my-[10px] bg-[#0a66c2] cursor-pointer">Sign up</button>
        </form>
      
    </div>
  );
}

export default Signup;
