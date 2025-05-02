import React, { useContext, useEffect, useState } from "react";
import logo2 from "../assets/logo2.png";
import { FaSearch } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import dp from "../assets/dp.png";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { setUserData, handleGetProfile } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const { userData } = useContext(userDataContext);
  const [activeSearch, setActiveSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handlelogout = async () => {
    try {
      await axios.post(serverUrl + "/logout", {
        withCredentials: true,
      });

      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/user/search?query=${search}`,
        {
          withCredentials: true,
        }
      );
      setSearchData(result.data);
      
    } catch (error) {
      setSearchData([])
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search, setSearch]);
  return (
    <div className="h-[80px] w-full flex justify-around items-center mb-[10px] bg-white z-10 fixed top-0 shadow-lg">
      {searchData.length > 0 && (
        <div className="bg-white min-h-[100px] w-[95%] p-[20px] left-[10px] md:w-[700px]  absolute top-[100px] md:left-[50px] flex flex-col items-center rounded-lg shadow-lg">
          {searchData.map((s) => (
            <div
              key={s._id}
              onClick={()=>handleGetProfile(s.userName)}
              className=" w-full h-[80px] flex items-center hover:bg-gray-300 rounded-lg"
            >
              <div className="p-[10px] h-[60px] w-[60px] rounded-full overflow-hidden  flex flex-col justify-center items-center">
                <img
                  src={s.profileImage ? s.profileImage : dp}
                  alt=""
                  className="h-full w-full rounded-full "
                />
              </div>
              <div>
              <div className="font-semibold pl-[10px]">
                {s.firstName + " "}
                {s.lastName}
              </div>
              <div className="pl-[10px]">
                {s.headline}
              </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
      {/* navbar-left */}
      <div className="flex justify-center items-center gap-[10px] relative">
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
            value={search}
            placeholder="Search user..."
            className="w-[80%] h-full outline-none border-0 bg-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="flex gap-[15px] relative justify-center items-center">
        {/* mini-profile */}
        <div
          className={`absolute w-[300px] min-h-[300px] shadow-xl right-[50px] md:right-0 lg:right-0 top-[80px] rounded-lg bg-white ${
            showProfile ? "block" : "hidden"
          } flex flex-col justify-center gap-[10px] items-center`}
        >
          <div className="h-[70px] w-[70px] rounded-full overflow-hidden  flex flex-col justify-center items-center">
            <img
              src={userData.profileImage ? userData.profileImage : dp}
              alt=""
              className="h-full w-full rounded-full "
            />
          </div>
          <div className="font-semibold">
            {userData.firstName + " "}
            {userData.lastName}
          </div>

          <button
            onClick={() => handleGetProfile(userData.userName)}
            className="w-[80%] py-[5px] border-1 border-[#0a66c2] rounded-full text-[#0a66c2] font-semibold"
          >
            View Profile
          </button>
          <div className=" m-[10px] border-[1px] border-gray-400 w-[80%]"></div>
          <div
            onClick={() => navigate("/network")}
            className="flex gap-[10px] my-[5px] py-10px justify-center items-center text-gray-600"
          >
            <FaUserGroup className="text-[25px]" />
            <div>My Network</div>
          </div>
          <button
            onClick={handlelogout}
            className="w-[80%] py-[5px] border-1 border-[#ec3211df] rounded-full text-[#ec3211df] font-semibold"
          >
            Sign Out
          </button>
        </div>
        {/* navbar-rightt */}
        <div
          onClick={() => navigate("/")}
          className="lg:flex flex-col justify-center items-center text-gray-600 hidden"
        >
          <IoMdHome className="text-[25px]" />
          <div>Home</div>
        </div>
        <div
          onClick={() => navigate("/network")}
          className="md:flex flex-col justify-center items-center text-gray-600 hidden"
        >
          <FaUserGroup className="text-[25px]" />
          <div>My network</div>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-600">
          <IoNotificationsSharp className="text-[25px] " />
          <div className="hidden md:block">Notification</div>
        </div>
        <div
          className="h-[50px] w-[50px] rounded-full overflow-hidden flex flex-col justify-center items-center"
          onClick={() => {
            setShowProfile((prev) => !prev);
          }}
        >
          <img
            src={userData.profileImage ? userData.profileImage : dp}
            alt=""
            className="h-[60px] rounded-full "
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
