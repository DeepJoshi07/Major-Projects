import React, { useContext } from "react";
import AddPost from "../Posts/AddPost.jsx"
import Navbar from "../components/Navbar.jsx";
import Profile from "../Profile/Profile.jsx";
import Posts from "../Posts/Posts.jsx";
import Others from "../components/Others.jsx";
import EditProfile from "../Profile/EditProfile.jsx";
import { userDataContext } from "../Context/UserContext.jsx";

function Home() {
  const {edit,newPost} = useContext(userDataContext)
  return (
    <div className="w-full h-[100vh] bg-[#f0efe7]">
      <Navbar />
      {edit && <EditProfile />}
      {newPost && <AddPost/>}
      <div className="bg-[#f0efe7] relative flex flex-col lg:flex lg:flex-row justify-center px-[20px]">
        <Profile />
        <Posts />
        <Others />
      </div>
    </div>
  );
}

export default Home;
