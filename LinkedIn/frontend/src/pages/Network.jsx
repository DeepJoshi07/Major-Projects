import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import dp from "../assets/dp.png";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import {io} from 'socket.io-client'

let socket = io("http://localhost:4000");
function Network() {
  const { serverUrl,getPost } = useContext(userDataContext);
  const [invitations, setInvitations] = useState([]);
  const handleRequests = async () => {
    try {
      const result = await axios.get(serverUrl + `/connection/requests`, {
        withCredentials: true,
      });
      setInvitations(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const accept = async(id) => {
    try {
      await axios.put(serverUrl +`/connection/accept/${id}`,{},
        {withCredentials:true})
        setInvitations(invitations.filter((invite)=>id == invite.id))
    } catch (error) {
      console.log(error)
    }
  }
  const reject = async(id) => {
    try {
       await axios.put(serverUrl +`/connection/rejected/${id}`,{},
        {withCredentials:true})
        setInvitations(invitations.filter((invite)=>id == invite.id))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleRequests();
  }, []);
  // useEffect(() => {
  //   socket.on('invite',({receiver})=>{
  //     setInvitations(receiver.connection)
  //   })
  // }, [getPost]);
  return (
    <div className="w-full h-[100vh] bg-[#f0efe7]">
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-[#f0efe7]">
        <div className="flex  items-center text-2xl h-[80px] w-[90%] rounded-lg border-none pl-[20px] mt-[90px] my-[10px] bg-white shadow-lg">
          Invitations: {" " + invitations.length}
        </div>
        {invitations.map((invite, index) => {
          return (
            <div
              key={index}
              className="flex justify-between  items-center text-2xl h-[90px] w-[90%] max-w-[900px] rounded-lg border-none pl-[20px]  my-[10px] bg-white shadow-lg"
            >
              <div className='flex items-center text-xl h-[90px] w-[90%] max-w-[900px]'>
                <div className="flex cursor-pointer  h-[60px] w-[60px] overflow-hidden bg-black rounded-full">
                  <img
                    src={invite.sender.profileImage || dp}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className="pl-[10px]">
                  {invite.sender.firstName}
                  {invite.sender.lastName}
                </div>
              </div>
              <div className="flex w-[120px] gap-[20px] text-2xl">
                <IoMdCheckmarkCircle 
                onClick={()=>accept(invite._id)}
                className="text-4xl text-[#0a66c2]" />
                <RxCrossCircled 
                onClick={()=>reject(invite._id)}
                className="text-4xl text-red-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Network;
