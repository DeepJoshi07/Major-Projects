import React from 'react'
import Post from './Post'

const Feed = () => {
  return (
    <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
      <Post/>
      <Post/>
    </div>
  )
}

export default Feed
