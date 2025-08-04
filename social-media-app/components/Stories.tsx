import prisma from '@/library/client'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import StoryList from './StoryList'

const Stories = async() => {
  const{userId:currentUserId} = await auth();

  if(!currentUserId) return null
  const stories = await prisma.stories.findMany({
    where:{
      expiresAt:{
        gt:new Date(),
      },
      OR:[
        {
          user:{
            followers:{
              some:{
                followerId:currentUserId
              }
            }
          }
        }
      ]
    },
    include:{
      user:true
    }
  }) 
  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll no-scrollbar text-xs'>
      <div className='flex gap-8 w-max'>
        {/* Story */}
        <StoryList stories={stories} userId={currentUserId}/>
      </div>
    </div>
  )
}

export default Stories
