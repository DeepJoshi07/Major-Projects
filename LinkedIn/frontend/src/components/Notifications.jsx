import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import dp from "../assets/dp.png";
import { MdOutlineClose } from "react-icons/md";

function Notifications() {
  const { serverUrl, userData } = useContext(userDataContext);
  const [notifications, setNotificatioins] = useState([]);
  const getNotifications = async () => {
    try {
      const result = await axios.get(serverUrl + `/notification/get`, {
        withCredentials: true,
      });

      setNotificatioins(
        result.data.filter((n) => userData._id != n.reciever.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOne = async (id) => {
    try {
      await axios.delete(
        serverUrl + `/notification/deleteone/${id}`,
        {
          withCredentials: true,
        }
      );
      await getNotifications()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(serverUrl + `/notification`, {
        withCredentials: true,
      });

      setNotificatioins([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = (type) => {
    if (type == "like") {
      return "liked your post.";
    } else if (type == "comment") {
      return "commented on your post.";
    } else {
      return "accepted your connection request.";
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <div className="w-screen h-[100vh] flex flex-col items-center pt-[100px] bg-[#f0efe7]">
      <Navbar />
      <div className="bg-white w-[95%] lg:w-[800px] h-[80px] shadow-lg rounded-lg flex justify-between items-center px-[20px]">
        <h1 className="text-xl font-semibold text-gray-800">
          Notifications :{" " + notifications.length}
        </h1>
        <div>
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="w-[150px] h-[40px] rounded-full text-white font-semibold my-[10px] bg-[#0a66c2] cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      {notifications.length > 0 && (
        <div className="bg-white w-[95%] lg:w-[800px] overflow-auto min-h-[80px] my-[10px] shadow-lg rounded-lg flex flex-col justify-between items-center px-[20px]">
          {notifications.length > 0 && notifications.map((n, index) => {
            return (
              <div
                key={index}
                className=" relative flex flex-col justify-center text-xl  w-[90%] max-w-[900px]"
              >
                <div
                  onClick={() => handleDeleteOne(n._id)}
                  className="absolute right-[10px] top-[30px] text-2xl text-gray-800"
                >
                  <MdOutlineClose />
                </div>
                <div className=" md:flex flex-row justify-start sm:flex items-center my-[10px]">
                  <div className="flex cursor-pointer  h-[60px] w-[60px] overflow-hidden bg-black rounded-full">
                    <img
                      src={n.relatedUser.profileImage || dp}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="px-[10px]">
                    <span className="font-semibold">
                      {n.relatedUser.firstName + " "}
                      {n.relatedUser.lastName + " "}
                    </span>
                    {handleMessage(n.type)}
                  </div>
                </div>
                {n.relatedPost && (
                  <div className="w-full px-[10px] flex flex-col justify-center items-center">
                    <div className=" rounded-lg">
                      <img
                        className="rounded-lg"
                        src={n.relatedPost.image}
                        alt=""
                      />
                    </div>
                    <h3 className="font-semibold">Post description : </h3>
                    <div>{n.relatedPost.description}</div>
                  </div>
                )}
                <div className=" w-full h-[1px] my-[10px] bg-gray-300"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;
