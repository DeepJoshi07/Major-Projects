'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddProduct = () => {
    const [image,setImage] = useState(false)
    const [data,setData] = useState({
      title:'',
      author:'Alex Bennett',
      description:'',
      category:'Startup',
      authorImg:'/author_img.png',
      image:''
    })

    const onClickHandler = (e) => {
      const name = e.target.name
      const value = e.target.value

      setData(data => ({...data,[name]:[value]}))
     
    }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('category',data.category)
    formData.append('authorImg',data.authorImg)
    formData.append('author',data.author)
    formData.append('image',image)

    const result = await axios.post('/api/blog',formData)

    if(result.data.success){
      toast.success(result.data.message)
      setImage(false)
      setData({
      title:'',
      author:'Alex Bennett',
      description:'',
      category:'Startup',
      authorImg:'/author_img.png',
      image:''
    })
    }else{
      toast.error("something went wrong")
    }
  }
  return (
    <>
      <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="image">
            <Image className='mt-5' src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt=''/>
        </label>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} id='image'hidden required />
        <p className='text-xl mt-4 '>Blog title</p>
        <input name='title' onChange={onClickHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required id="" />
        <p className='text-xl mt-4 '>Blog description</p>
        <textarea name='description' onChange={onClickHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write content here' rows={6}required  id="" />
        <p className='text-xl mt-4 '>
            Blog category
        </p>
        <select name="category" onChange={onClickHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500' id="">
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type='submit' onClick={onSubmitHandler} className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  )
}

export default AddProduct
