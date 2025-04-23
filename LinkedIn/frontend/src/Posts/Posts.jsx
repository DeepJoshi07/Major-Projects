import React, { useContext, useEffect } from "react";
import { userDataContext } from "../Context/UserContext";
import dp from "../assets/dp.png";
import AllPost from "./AllPost";
import {io} from 'socket.io-client'

let socket = io("http://localhost:4000");
function Posts() {
  const { userData, setNewPost, postData, setPostData } = useContext(userDataContext);
  useEffect(()=>{
    socket.on('posts',({post})=>{
        setPostData(post)
    })
    return () =>{
      socket.off('posts')
    }
  },[postData])

  return (
    <div className="w-full lg:w-[50%]  lg:mt-[100px] mt-[20px] lg:mx-[20px] gap-[20px]  rounded-lg bg-[#f0efe7] ">
      <div className="w-full flex justify-center items-center gap-[10px] bg-white min-h-[110px] rounded-lg">
        <div className="cursor-pointer  h-[70px] w-[70px] overflow-hidden bg-black rounded-full">
          <img
            src={userData.profileImage ? userData.profileImage : dp}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div
          onClick={() => setNewPost(true)}
          className="w-[75%] h-[60px] flex items-center px-[20px] border-2 border-gray-600 rounded-full"
        >
          Start a new post...
        </div>
      </div>
      {postData.map((post, index) => (
        <AllPost
          key={index}
          id={post._id}
          description={post.description}
          image={post.image}
          author={post.author}
          like={post.like}
          comment={post.comment}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}

export default Posts;
