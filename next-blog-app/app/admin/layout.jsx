import Sidebar from "@/components/adminCOmponents/Sidebar";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

function layout({ children }) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full ">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium">Admin Panel</h3>
            <Image src={assets.profile_icon} width={40} alt="" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default layout;
