"use client";

import { switchBlock, switchFollow } from "@/library/action";
import { useOptimistic, useState } from "react";

type UserStates = {
  following: boolean;
  blocked: boolean;
  followingReqSent: boolean;
};

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingReqSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingReqSent: boolean;
  
}) => {
  const [userState, setUserState] = useState<UserStates>({
    following: isFollowing,
    blocked: isUserBlocked,
    followingReqSent: isFollowingReqSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingReqSent:
          !prev.following && !prev.followingReqSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const block = async () =>{
   switchOptimisticState('block')
    try {
       await switchBlock(userId)
      setUserState(prev =>({
        ...prev,
        blocked:!prev.blocked,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state,value:"follow" | "block") => value == "follow" ?({
      ...state,
      following: state.following && false,
      followingReqSent:
        !state.following && !state.followingReqSent ? true : false,
    }):{...state, blocked:!state.blocked}
  );
  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingReqSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end ">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
