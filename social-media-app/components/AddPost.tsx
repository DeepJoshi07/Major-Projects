import Image from "next/image";
import React from "react";

const AddPost = () => {

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        alt=""
        src="https://images.pexels.com/photos/30530440/pexels-photo-30530440.jpeg"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form className="flex gap-4">
          <textarea
            placeholder="What's on mind?"
            className="flex-1 p-2 bg-slate-100 rounded-lg"
            name="desc"
            id=""
          ></textarea>
          <Image
            alt=""
            src="/emoji.png"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image alt="" src="/addImage.png" width={20} height={20} />
            Photo
          </div>
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
