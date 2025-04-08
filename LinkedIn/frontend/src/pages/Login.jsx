import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { authDataContext } from "../Context/AuthContext.jsx";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext.jsx";

function Login() {
   const navigate = useNavigate()
   const {serverUrl} = useContext(authDataContext);
   const {getUserData,setUserData} = useContext(userDataContext)


   const [show, setShow] = useState(false);
   const [lodding,setLodding] = useState(false)
   const [err,setErr] = useState("")
 
   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);

   const sendInfo = async(e)=>{
      e.preventDefault()
      setLodding(true)
      try {
        let result = await axios.post(serverUrl + "/login",{
          email,password
        },{
          withCredentials:true
        })
        console.log(result);
        setErr("")
        setEmail("")
        setPassword("")
        setLodding(false)
        getUserData();
        navigate('/')
        
      } catch (error) {
        setErr(error.response.data.message)
        setLodding(false)
        setUserData(null)
      }
   }
   return (
     <div className="w-full h-screen flex flex-col justify-start items-center">
       <div className="w-full p-[30px] lg:p-[35px]">
         <img src={logo} alt="" />
       </div>
 
       <form
         action=""
         onSubmit={sendInfo}
         className="w-[90%] max-w-[400px] h-[600px] gap-[10px] p-[15px] border-none md:shadow-xl flex flex-col justify-center "
       >
         <h2 className="text-3xl text-gray-800 mb-[30px] font-semibold">
           Sign In
         </h2>
         <input
           type="email"
           placeholder="Email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
         />
         <div className="h-[50px] w-[100%] relative border-2 border-gray-600 text-gray-800 text-[18px] border-none rounded-md">
           <span
             className="absolute mt-[10px] ml-[300px] text-[#0a66c2] cursor-pointer"
             onClick={() => setShow((prev) => !prev)}
           >
             {show ? <p className="font-semibold">hide</p> : <p className="font-semibold">show</p>}
           </span>
           <input
             type={show ? "text" : "password"}
             placeholder="Password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
           />
         </div>
          {err &&<p className="text-red-600 text-center">{err}</p>}
         <button disabled={lodding}
         className="w-[100%] h-[50px] rounded-full text-white font-semibold my-[10px] bg-[#0a66c2] cursor-pointer">
         {lodding?"Lodding....":"Sign In"}
         </button>
         <p
          className="text-center cursor-pointer"
          onClick={()=>navigate('/signup')}
        >Don't have an account? <span className="text-[#0a66c2]">sign up</span></p>
       </form>
     </div>
   );
}

export default Login
