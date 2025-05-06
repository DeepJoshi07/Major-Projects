import React, { useContext, useEffect, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import dp from '../assets/dp.png'

function Others() {
  const { serverUrl, handleGetProfile } = useContext(userDataContext);
  const [suggetions, setSuggetions] = useState([]);

  const handleSuggestedUsers = async () => {
    try {
      const result = await axios.get(serverUrl + `/user/suggestedusers`, {
        withCredentials: true,
      });
      
      setSuggetions(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    handleSuggestedUsers()
  },[])
  return (
    <div className="w-full lg:w-[25%] max-h-[300px] p-[10px] rounded-lg lg:mt-[100px] mt-[20px] shadow-lg bg-white hidden lg:flex flex-col ">
     {suggetions.length > 0 && <h1 className="p-[10px] text-xl font-semibold">Suggested Users : </h1>} 
     {suggetions.length === 0 && <h1 className="p-[10px] text-xl font-semibold">No Suggested Users Found. </h1>} 
      {suggetions.map((s) => (
        <div
          key={s._id}
          onClick={() => handleGetProfile(s.userName)}
          className=" w-full h-[80px] p-[10px] flex items-center hover:bg-gray-300 rounded-lg"
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
            <div className="pl-[10px]">{s.headline}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Others;
