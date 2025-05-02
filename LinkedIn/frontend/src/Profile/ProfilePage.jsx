import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { userDataContext } from "../Context/UserContext";
import dp from "../assets/dp.png";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import EditProfile from "./EditProfile";
import { v4 as uuidv4 } from "uuid";
import AllPost from "../Posts/AllPost";
import ConnectionBtn from "../components/ConnectionBtn";

function ProfilePage() {
  const { setEdit, edit, postData, profileData, userData } =
    useContext(userDataContext);

  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    setUserPost(postData.filter((p) => profileData._id == p.author._id));
  }, [profileData]);
  return (
    <div className="w-full min-h-[100vh] px-[10px] flex flex-col items-center bg-[#f0efe7]">
      <Navbar />
      {edit && <EditProfile />}
      <div className="w-[100%] lg:w-[70%]  flex flex-col justify-center items-center">
        <div className="w-full min-h-[330px]  mt-[100px] relative shadow-lg p-[10px] rounded-lg  bg-white ">
          <div
            onClick={() => setEdit(true)}
            className="w-full h-[120px] relative bg-gray-400 rounded-lg"
          >
            <img
              src={profileData.coverImage ? profileData.coverImage : null}
              className="w-full h-full rounded-lg"
              alt=""
            />
            <div className=" absolute text-white top-[20px] right-[20px]">
              <MdOutlineCameraAlt className="cursor-pointer text-3xl" />
            </div>
          </div>
          <div
            onClick={() => setEdit(true)}
            className="cursor-pointer absolute top-[80px] left-[40px] h-[70px] w-[70px] overflow-hidden bg-black rounded-full"
          >
            <img
              src={profileData.profileImage ? profileData.profileImage : dp}
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="absolute cursor-pointer h-[25px] w-[25px] rounded-full top-[125px] left-[90px] text-white bg-[#0a66c2] flex justify-center items-center">
            <FaPlus />
          </div>
          <div className="mt-[30px] px-[30px] font-semibold flex flex-col justify-center">
            <div className="text-[20px]">
              {profileData.firstName + " "}
              {profileData.lastName}
            </div>
            <div>{profileData.headline ? profileData.headline : ""}</div>
            <div className="text-[14px]">
              {profileData.location ? profileData.location : ""}
            </div>
            <div>Connection : {profileData.connection.length}</div>
          </div>
          {userData.userName == profileData.userName ? (
            <button
              onClick={() => setEdit(true)}
              className="w-[200px] h-[50px] ml-[30px] rounded-full text-[#0a66c2] font-semibold my-[20px] border-2 border-[#0a66c2] cursor-pointer"
            >
              Edit Profile
            </button>
          ) : (
            <div className="ml-[30px] my-[20px]">
              <ConnectionBtn  userId={profileData._id} />
            </div>
          )}
        </div>
        <div className="bg-white w-full text-gray-800 mt-[20px] py-[20px] px-[30px] rounded-lg shadow-lg">
          <h1 className="font-semibold text-2xl">Post ({userPost.length})</h1>
        </div>
        {userPost.map((post) => (
          <AllPost
            key={uuidv4()}
            id={post._id}
            description={post.description}
            image={post.image}
            author={post.author}
            like={post.like}
            comment={post.comment}
            createdAt={post.createdAt}
          />
        ))}
        {profileData.skills ? (
          <div className=" flex flex-col justify-center bg-white w-full text-gray-800 mt-[20px] py-[20px] px-[30px] rounded-lg shadow-lg">
            <h1 className="font-semibold text-2xl">Skills</h1>
            <div className="flex flex-col sm:flex-row items-center font-semibold gap-[20px] mt-[20px]">
              {profileData.skills.map((s) => (
                <div>{s}</div>
              ))}
              {userData.userName == profileData.userName ? (
                <button
                  onClick={() => setEdit(true)}
                  className="w-[150px] h-[40px] rounded-full text-[#0a66c2] font-semibold border-2 border-[#0a66c2] cursor-pointer"
                >
                  + Add Skills
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        {profileData.education ? (
          <div className="flex flex-col justify-center bg-white w-full text-gray-800 mt-[20px] py-[20px] px-[30px] rounded-lg shadow-lg">
            <h1 className="font-semibold text-2xl">Education</h1>
            <div className="flex flex-col  items-center font-semibold gap-[20px] mt-[20px]">
              {profileData.education.map((edu) => (
                <>
                  <div>College : {edu.college}</div>
                  <div>Degree : {edu.degree}</div>
                  <div>Field of Study : {edu.fieldOfStudy}</div>
                </>
              ))}
              {userData.userName == profileData.userName ? (
                <button
                  onClick={() => setEdit(true)}
                  className="w-[150px] h-[40px] rounded-full text-[#0a66c2] font-semibold border-2 border-[#0a66c2] cursor-pointer"
                >
                  + Add Education
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        {profileData.experience ? (
          <div className="flex flex-col justify-center bg-white w-full text-gray-800 my-[20px] py-[20px] px-[30px] rounded-lg shadow-lg">
            <h1 className="font-semibold text-2xl">Experience</h1>
            <div className="flex flex-col  items-center font-semibold gap-[20px] mt-[20px]">
              {profileData.experience.map((ex) => (
                <>
                  <div>Title : {ex.title}</div>
                  <div>Company : {ex.company}</div>
                  <div>Description : {ex.description}</div>
                </>
              ))}
              {userData.userName == profileData.userName ? (
                <button
                  onClick={() => setEdit(true)}
                  className="w-[150px] h-[40px] rounded-full text-[#0a66c2] font-semibold border-2 border-[#0a66c2] cursor-pointer"
                >
                  + Add Education
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProfilePage;
