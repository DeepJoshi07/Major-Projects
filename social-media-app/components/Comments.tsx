import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div className="">
      {/* write */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/32487743/pexels-photo-32487743.jpeg"
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a Comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* comments */}
      <div className=''>
        {/* comment */}
        <div className="flex gap-4 justify-between mt-6 ">
          {/* avatar */}
          <Image
            src="https://images.pexels.com/photos/32487743/pexels-photo-32487743.jpeg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          {/* desc */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Deep Joshi</span>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              facere dolorum esse mollitia. Dolore quasi deleniti ipsam natus
              beatae eaque. Saepe nobis officia beatae repellat dicta vero
              temporibus quos earum!
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  123 <span className="hidden md:inline">Likes</span>
                </span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* icon */}
          <Image
            alt=""
            src="/more.png"
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
