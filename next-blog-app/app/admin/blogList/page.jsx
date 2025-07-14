'use client'
import BlogTableItem from '@/components/adminCOmponents/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function BLogList() {
  const [blogs,setBlogs] = useState([])

  const fetchBlogs = async()=>{
    const result = await axios.get('/api/blog');
    setBlogs(result.data)
  }
  const handleDelete = async(id) => {
    const result = await axios.delete('/api/blog',{params:{
      id
    }})
    toast.success(result.data.message)
    fetchBlogs()
  }

  useEffect(()=>{
    fetchBlogs()
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[900px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Author Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Blog Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              blogs.map((item,index)=>{
                return <BlogTableItem deleteBlog={handleDelete} mongoId={item._id} date={item.date} title={item.title} key={index} authorImg={item.authorImg} author={item.author}/>
              })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BLogList
