import prisma from "@/library/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ otherUser }: { otherUser: User }) => {
  const createdDate = new Date(otherUser.createdAt);
  const formattedDate = createdDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingReqSent = false;

  const { userId: currentUserId } = await auth();
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockedId: otherUser.id,
        blockerId: currentUserId,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followerRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: otherUser.id,
      },
    });
    followerRes ? (isFollowing = true) : (isFollowing = false);

    const followerReq = await prisma.followerRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: otherUser.id,
      },
    });

    followerReq ? (isFollowingReqSent = true) : (isFollowingReqSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === otherUser.id ? (
          <UpdateUser otherUser={otherUser} />
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {otherUser.name && otherUser.surname
              ? otherUser.name + " " + otherUser.surname
              : otherUser.username}
          </span>
          <span className="text-sm">@{otherUser.username}</span>
        </div>
        {otherUser.description && <p>{otherUser.description}</p>}
        {otherUser.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span>
              Living in <b>{otherUser.city}</b>
            </span>
          </div>
        )}

        {otherUser.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Went to <b>{otherUser.school}</b>
            </span>
          </div>
        )}

        {otherUser.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b>{otherUser.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {otherUser.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" width={16} height={16} />
              <Link href="/" className="text-blue-500 font-medium">
                {otherUser.website}
              </Link>
            </div>
          )}

          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>

        {currentUserId && currentUserId !== otherUser.id && (
          <UserInfoCardInteraction
            userId={otherUser.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingReqSent={isFollowingReqSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
