import React from "react";
import Posts from "@/components/feed/Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/library/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();
  
  let posts;

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log(posts)
  }
  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });
    const followingIds = following.map((f) => f.followingId);
    followingIds.push(userId);
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log(posts)
  }
  // console.log(posts)
  if(!username && !userId) return null;
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts!.length
        ? (posts!.map((post) => <Posts key={post.id} posts={post}/>))
        : "No Posts Found"}
    </div>
  );
};

export default Feed;
