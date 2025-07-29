"use client";

import Image from "next/image";

const StoryList = ({}) => {
  
  return (
    // <>
    //   <CldUploadWidget
    //     uploadPreset="social"
    //     onSuccess={(result, { widget }) => {
    //       setImg(result.info);
    //       widget.close();
    //     }}
    //   >
    //     {({ open }) => {
    //       return (
    //         <div className="flex flex-col items-center gap-2 cursor-pointer relative">
    //           <Image
    //             src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
    //             alt=""
    //             width={80}
    //             height={80}
    //             className="w-20 h-20 rounded-full ring-2 object-cover"
    //             onClick={() => open()}
    //           />
    //           {img ? (
    //             <form action={add}>
    //               <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
    //                 Send
    //               </button>
    //             </form>
    //           ) : (
    //             <span className="font-medium">Add a Story</span>
    //           )}
    //           <div className="absolute text-6xl text-gray-200 top-1">+</div>
    //         </div>
    //       );
    //     }}
    //   </CldUploadWidget>
    //   {/* STORY */}
    //   {optimisticStories.map((story) => (
    //     <div
    //       className="flex flex-col items-center gap-2 cursor-pointer"
    //       key={story.id}
    //     >
    //       <Image
    //         src={story.user.avatar || "/noAvatar.png"}
    //         alt=""
    //         width={80}
    //         height={80}
    //         className="w-20 h-20 rounded-full ring-2"
    //       />
    //       <span className="font-medium">
    //         {story.user.name || story.user.username}
    //       </span>
    //     </div>
    //   ))}
    // </>
  );
};

export default StoryList;