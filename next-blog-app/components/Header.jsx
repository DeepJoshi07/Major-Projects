import Image from "next/image";
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const [email,setEmail]  = useState('')

  const submitEmail = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email',email) 
    const result = await axios.post('/api/email',formData);
    console.log(result)
    if(result.data.success){
      toast.success(result.data.message)
      setEmail('')
    }else{
      toast.error('something went wrong!')
    }
    
  }

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <div className="w-[130px] sm:w-auto">
          <Image src={assets.logo} alt='' width={180} alt="" />
        </div>

        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get started <Image src={assets.arrow} />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
          voluptas in neque cum autem vero obcaecati consectetur, a doloribus
          ab? Ut error repellat placeat dicta rerum ullam sunt iste deleniti?
        </p>
        <form
          action=""
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            onClick={submitEmail}
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
