import Image from 'next/image'
import React from 'react'

const Stories = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll no-scrollbar text-xs'>
      <div className='flex gap-8 w-max'>
        {/* Story */}
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src='https://images.pexels.com/photos/32752283/pexels-photo-32752283.jpeg' width={80} height={80} alt='' className='w-20 h-20 border-2 border-gray-400 rounded-full ring-2'/>
          <span className='font-medium'>Ricky</span>
        </div>
      </div>
    </div>
  )
}

export default Stories
