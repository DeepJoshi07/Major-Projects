import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";


// #0a66c2
function Signup() {
 
  const navigate = useNavigate()
  const {serverUrl} = useContext(authDataContext)
  const {getUserData,setUserData} = useContext(userDataContext)


  const [lodding,setLodding] = useState(false)
  const[err,setErr] = useState("")
  const [show, setShow] = useState(false);


  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const sendInfo = async(e)=>{
    e.preventDefault()
    setLodding(true)
    try {
      let result = await axios.post(serverUrl + "/signup",{
        firstName,lastName,userName,email,password
      },{
        withCredentials:true
      })
      console.log(result);
      setErr("")
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setLodding(false)
      getUserData()
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
          Sign Up
        </h2>
        <input
          type="text"
          placeholder="FirstName"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] focus:border-blue-500 focus:outline-none rounded-md"
        />
        <input
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
        />
        <input
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}
          className="h-[50px] w-[100%] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md"
        />
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
          {lodding?"Lodding....":"Sign up"}
        </button>
        <p
          className="text-center cursor-pointer"
          onClick={()=>navigate('/login')}
        >Already have an account? <span className="text-[#0a66c2]">sign in</span></p>
      </form>
    </div>
  );
}

export default Signup;
