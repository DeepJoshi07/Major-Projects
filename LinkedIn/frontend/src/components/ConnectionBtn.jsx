import React, { useContext, useEffect, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ConnectionBtn({ userId }) {
  // userid is id of posts other
  let { serverUrl, userData,socket } = useContext(userDataContext);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSendConnection = async () => {
    try {
      // userid is the post author's id
      let result = await axios.post(
        serverUrl + `/connection/send/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetStatus = async () => {
    try {
      let result = await axios.get(
        serverUrl + `/connection/getstatus/${userId}`,
        { withCredentials: true }
      );
      
      setStatus(result.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveConnection = async () => {
    try {
      let result = await axios.delete(
        serverUrl + `/connection/remove/${userId}`,
        { withCredentials: true }
      );
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    if (status == "disconnect") {
      await handleRemoveConnection();
    } else if (status == "received") {
      navigate("/network");
    } else {
      await handleSendConnection();
    }
  };

  useEffect(() => {
    socket.emit("register", userData._id);
    handleGetStatus();
    socket.on("statusUpdated", ({ updatedUserId, newStatus }) => {
      if (updatedUserId == userId) {
        setStatus(newStatus);
      }
    });
    socket.on('rejectedStatus',({status})=>{
        setStatus(status)
    })
    return () => {
      socket.off("statusUpdated");
      socket.off("rejectedStatus");
    };
  }, [userId]);
  return (
    <div>
      <button
        onClick={handleClick}
        disabled={status === "pending"}
        className="px-[20px] py-[8px] border-1 border-[#0a66c2] rounded-full text-[#0a66c2] font-semibold"
      >
        {status}
      </button>
    </div>
  );
}

export default ConnectionBtn;
