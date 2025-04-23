import React, { useContext, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { userDataContext } from "../Context/UserContext";
import dp from "../assets/dp.png";
import { FaImage } from "react-icons/fa6";
import axios from "axios";

function AddPost() {
  const { setNewPost, userData, serverUrl, getPost, setPosting, posting } =
    useContext(userDataContext);
  const [description, setDescription] = useState(null);
  const [postingImage, setPostingImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPostingImage(file);
    setBackendImage(URL.createObjectURL(file));
  };

  const postImage = useRef();
  const formData = new FormData();
  formData.append("description", description);
  if (postingImage) {
    formData.append("image", postingImage);
  }

  
  const handlePost = async () => {
    setPosting(true);
    try {
      await axios.post(serverUrl + "/data/addpost", formData, {
        withCredentials: true,
      });

      setNewPost(false);
      setPosting(false);
      getPost();
    } catch (error) {
      setPosting(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 flex flex-col justify-center items-center z-100">
      <div className="w-full h-[100vh] bg-black opacity-60"></div>
      <div className="absolute rounded-lg  flex flex-col justify-start p-[20px] bg-white w-[80%] sm:w-[500px] ">
        <div className="text-gray-600 text-3xl  absolute right-[20px] top-[20px] cursor-pointer">
          <MdOutlineClose onClick={() => setNewPost(false)} />
        </div>
        <div className="flex items-center gap-[10px] ">
          <div className="cursor-pointer  h-[70px] w-[70px] overflow-hidden bg-black rounded-full">
            <img
              src={userData.profileImage ? userData.profileImage : dp}
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="font-semibold text-[18px]">
            {userData.firstName + " "}
            {userData.lastName}
            <br />
            <span className="text-[14px]">{userData.headline}</span>
          </div>
        </div>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className={` ${
            backendImage ? "h-[100px]" : "h-[300px]"
          }  my-[10px] resize-none border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px]  focus:border-blue-500 focus:outline-none rounded-md`}
          placeholder="Write something..."
        ></textarea>
        {backendImage ? (
          <div className=" w-full p-[20px] flex justify-center">
            <img
              src={backendImage}
              className="h-[200px] w-[200px] rounded-lg"
              alt=""
            />
          </div>
        ) : null}

        {!backendImage ? (
          <div
            onClick={() => postImage.current.click()}
            className="py-[20px] flex gap-[20px]  text-gray-600"
          >
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              hidden
              ref={postImage}
            />
            <FaImage className="text-2xl text-gray-600" />
            Click to upload Image
          </div>
        ) : null}

        <div className="h-[2px] w-full border-1 border-gray-600"></div>

        <div className="flex flex-row-reverse">
          <button
            onClick={handlePost}
            className="my-[20px]  right-0 bg-[#0a66c2] font-semibold w-[80px] rounded-lg text-white py-[8px]"
          >
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default AddPost;
