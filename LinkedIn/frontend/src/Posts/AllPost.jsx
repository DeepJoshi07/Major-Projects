import React, { useContext, useEffect, useState } from "react";
import dp from "../assets/dp.png";
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { userDataContext } from "../Context/UserContext";
import { IoSend } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import axios from "axios";
import { io } from "socket.io-client";
import ConnectionBtn from "../components/ConnectionBtn";

let socket = io("http://localhost:4000");
function AllPost({ id, author, like, comment, description, createdAt, image }) {
  const [readless, setRead] = useState(true);
  const { serverUrl, getPost, userData, handleGetProfile } = useContext(userDataContext);
  const [content, setContent] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(like || []);
  const [comments, setComments] = useState(comment || []);
 


  const handleLike = async () => {
    try {
      const result = await axios.post(
        serverUrl + `/data/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLikes(result.data.like);
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const result = await axios.post(
        serverUrl + `/data/comment/${id}`,
        { content },
        {
          withCredentials: true,
        }
      );
      setContent("");
      setComments(result.data.comment);
      getPost();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket.on("likeUpdated", ({ postId, likes }) => {
      if (postId == id) {
        setLikes(likes);
      }
    });
    socket.on("commentUpdated", ({ postId, comment }) => {
      if (postId == id) {
        setComments(comment);
      }
    });
   
    return () => {
      socket.off("likeUpdated");
      socket.off("commentUpdated");
    };
  }, [id]);
  return (
    <div className="w-full bg-white flex flex-col  mt-[20px] p-[20px] shadow-xl rounded-lg">
      <div className="flex justify-between items-center gap-[10px] ">
        <div className="flex items-center gap-[10px] "
          onClick={()=>handleGetProfile(author.userName)}
        >
          {/* profile and button */}
          <div className="cursor-pointer  h-[70px] w-[70px] overflow-hidden bg-black rounded-full">
            <img
              src={author.profileImage ? author.profileImage : dp}
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="font-semibold text-[18px] text-gray-800">
            {author.firstName + " "}
            {author.lastName}
            <br />
            <span className="text-[14px]">{author.headline}</span>
            <br />
            <span className="text-xs text-gray-600">
              {moment(createdAt).fromNow()}
            </span>
          </div>
        </div>
        {userData._id != author._id && <ConnectionBtn userId={author._id}/>}
        
      </div>
      {/* description */}
      <div
        className={`py-[10px] px-[20px] ${
          readless ? "overflow-hidden max-h-[100px]" : ""
        }`}
      >
        {description}
      </div>
      <div
        onClick={() => setRead((prev) => !prev)}
        className={`py-[10px] px-[20px] text-[19px] text-[#0a66c2] font-semibold`}
      >
        {readless ? "read more..." : "read less..."}
      </div>
      <div className="py-[10px] w-full flex justify-center">
        <img src={image} alt="" className="w-[90%] rounded-lg" />
      </div>
      {/* show like comment numbers */}
      <div className="flex justify-between px-[15px] py-[10px]">
        <div className="flex items-center gap-[5px]">
          <BiLike className="text-[#0a66c2]" />
          {likes.length}
        </div>
        <div
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-[5px]"
        >
          {comments.length}
          <FaRegCommentDots />
        </div>
      </div>
      <div className="w-full border-1 border-gray-600 my-[10px]"></div>
      <div className="flex items-center gap-[10px] p-[10px] text-gray-600">
        {/* like */}
        <div
          onClick={handleLike}
          className="flex items-center gap-[10px]"
        >
          {likes.includes(userData._id) ? (
            <BiSolidLike className="text-[#0a66c2] text-2xl" />
          ) : (
            <BiLike className="text-gray-600 text-2xl" />
          )}
          {likes.includes(userData._id) ? "Liked" : "Like"}
        </div>
        {/* comment */}
        <div
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-[10px]"
        >
          <FaRegCommentDots className="text-gray-600 text-xl" />
          Comment
        </div>
      </div>
      {/* comment input */}
      <div className="w-full border-b-2 border-b-gray-300 px-[20px] py-[10px] flex ">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="leave a comment..."
          className="w-full  outline-none"
        />
        <IoSend onClick={handleComment} className="text-[#0a66c2] text-xl" />
      </div>
      {/* show comments */}
      {showComments ? (
        <div className="flex flex-col justify-center gap-[20px] px-[10px] mt-[20px]">
          {comments.map((c, index) => (
            <div key={index}>
              <div className="flex gap-[10px]">
                <div className="cursor-pointer  h-[30px] w-[30px] overflow-hidden bg-black rounded-full">
                  <img
                    src={c.user.profileImage ? c.user.profileImage : dp}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <span className="font-semibold">
                  {c.user.firstName+" "}
                  {c.user.lastName}
                </span>
              </div>
              <div className="py-[10px] pl-[40px]">{c.content}</div>
              <div className="w-full border-1 border-gray-300 my-[10px]"></div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AllPost;
