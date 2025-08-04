import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "@/components/feed/Comments";
import { Post, User } from "@prisma/client";
import PostInteraction from "./PostIntraction";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

type PostType = Post & { user: User } & { likes: { userId: string }[] } & {
  _count: { comments: number };
};

const Posts =  async ({ posts }: { posts: PostType }) => {
  const {userId} = await auth();
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={posts?.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {posts.user.name && posts.user.surname
              ? posts.user.name + " " + posts.user.surname
              : posts.user.username}
          </span>
        </div>
        {userId === posts.user.id && <PostInfo postId={posts.id}/>}
        
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {posts.img && (
          <div className="full min-h-96 relative">
            <Image
              src={posts.img}
              alt=""
              className="object-cover rounded-md"
              fill
            />
          </div>
        )}
        <p>{posts.desc}</p>
      </div>
      {/* INTERACTION */}
      <Suspense fallback="Loading...">
        <PostInteraction
          commentNumber={posts._count.comments}
          postId={posts.id}
          likes={posts.likes.map((l) => l.userId)}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments />
      </Suspense>
    </div>
  );
};

export default Posts;
