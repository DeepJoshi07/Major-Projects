import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src='https://images.pexels.com/photos/27849869/pexels-photo-27849869.jpeg'
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src='https://images.pexels.com/photos/27849869/pexels-photo-27849869.jpeg'
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">

        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/18511160/pexels-photo-18511160.jpeg"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/18511160/pexels-photo-18511160.jpeg"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/18511160/pexels-photo-18511160.jpeg"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-500">
           200 Followers
          </span>
        </div>
        <Link href={`/profile/test`}>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;