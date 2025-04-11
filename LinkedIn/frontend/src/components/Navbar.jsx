import React, { useContext, useState } from "react";
import logo2 from "../assets/logo2.png";
import { FaSearch } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import dp from "../assets/dp.png";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";


function Navbar() {
  const {setUserData} = useContext(userDataContext)
  const {serverUrl} = useContext(authDataContext)

  const { userData } = useContext(userDataContext);
  const [activeSearch, setActiveSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handlelogout = async () =>{
      try {
        const result = await axios.post(serverUrl + "/logout",{
          withCredentials:true
        })
        console.log(result);
        setUserData(null);
        
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="h-[80px] w-full flex justify-around items-center mb-[10px] bg-white z-10 fixed top-0 shadow-lg">
      <div className="flex justify-center items-center gap-[10px]">
        <div>
          <img
            src={logo2}
            onClick={() => setActiveSearch((prev) => !prev)}
            alt=""
            className="h-[50px]"
          />
        </div>
        {activeSearch ? (
          <div
            onClick={() => {
              setActiveSearch((prev) => !prev);
            }}
          >
            <FaSearch className="text-[20px] text-gray-600 mr-3 lg:hidden" />
          </div>
        ) : null}
        <form
          action=""
          className={`lg:w-[400px] h-[45px] relative rounded-lg lg:flex justify-center items-center bg-[#f0efe7] ${
            activeSearch ? "hidden" : "flex"
          }`}
        >
          <div onClick={() => setActiveSearch((prev) => !prev)}>
            <FaSearch className="text-[20px] text-gray-600 mr-3" />
          </div>
          <input
            type="text"
            placeholder="Search user..."
            className="w-[80%] h-full outline-none border-0 bg-transparent"
          />
        </form>
      </div>

      <div className="flex gap-[15px] relative justify-center items-center">
        <div
          className={`absolute w-[300px] min-h-[300px] shadow-xl top-[80px] rounded-lg bg-white ${
            showProfile ? "block" : "hidden"
          } flex flex-col justify-center gap-[10px] items-center`}
        >
          <div className="h-[70px] rounded-full overflow-hidden  flex flex-col justify-center items-center">
            <img src={dp} alt="" className="h-[70px] rounded-full " />
          </div>
          <div className="font-semibold">
            {userData.firstName + " "}
            {userData.lastName}
          </div>

          <button className="w-[80%] py-[5px] border-1 border-[#0a66c2] rounded-full text-[#0a66c2] font-semibold">
            View Profile
          </button>
          <div className=" m-[10px] border-[1px] border-gray-400 w-[80%]"></div>
          <div className="flex gap-[10px] my-[5px] py-10px justify-center items-center text-gray-600">
            <FaUserGroup className="text-[25px]" />
            <div>My Network</div>
          </div>
          <button onClick={handlelogout} className="w-[80%] py-[5px] border-1 border-[#ec3211df] rounded-full text-[#ec3211df] font-semibold">
                Sign Out
          </button>
        </div>
        <div className="lg:flex flex-col justify-center items-center text-gray-600 hidden">
          <IoMdHome className="text-[25px]" />
          <div>Home</div>
        </div>
        <div className="md:flex flex-col justify-center items-center text-gray-600 hidden">
          <FaUserGroup className="text-[25px]" />
          <div>My network</div>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-600">
          <IoNotificationsSharp className="text-[25px] " />
          <div className="hidden md:block">Notification</div>
        </div>
        <div
          className="h-[50px] rounded-full overflow-hidden flex flex-col justify-center items-center"
          onClick={() => {
            setShowProfile((prev) => !prev);
          }}
        >
          <img src={dp} alt="" className="h-[60px] rounded-full " />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
