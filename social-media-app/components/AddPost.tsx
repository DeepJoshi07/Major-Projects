'use client'
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/library/action";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [description, setDescription] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        alt=""
        src={user?.imageUrl || "/noAvatar.png"}
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action={(formData)=>addPost(formData,(img?.secure_url || ""))} className="flex gap-4">
          
          <textarea
            placeholder="What's on mind?"
            className="flex-1 p-2 bg-slate-100 rounded-lg"
            name="desc"
            id=""
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div>
          <Image
            alt=""
            src="/emoji.png"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <AddPostButton/>
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result,{widget}) =>{ setImg(result.info); widget.close()}}
          >
            {({ open }) => {
              return (
                <div onClick={()=>open()} className="flex items-center gap-2 cursor-pointer">
                  <Image alt="" src="/addImage.png" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image alt="" src="/addVideo.png" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image alt="" src="/poll.png" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image alt="" src="/addevent.png" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
