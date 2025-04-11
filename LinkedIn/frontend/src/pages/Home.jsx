import React, { useContext } from "react";

import Navbar from "../components/Navbar.jsx";
import Profile from "../components/Profile.jsx";
import Posts from "../components/Posts.jsx";
import Others from "../components/Others.jsx";
import EditProfile from "../components/EditProfile.jsx";
import { userDataContext } from "../Context/UserContext.jsx";

function Home() {
  const {editProfile} = useContext(userDataContext)
  return (
    <div className="w-full h-[100vh] bg-[#f0efe7]">
      <Navbar />
      {editProfile && <EditProfile />}
      <div className="bg-[#f0efe7] relative flex flex-col lg:flex lg:flex-row justify-center px-[20px]">
        <Profile />
        <Posts />
        <Others />
      </div>
    </div>
  );
}

export default Home;
