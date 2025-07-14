'use client'
import React from 'react'
import Header from '@/components/Header'
import BlogList from '@/components/BlogList'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Home = () => {
  return (
    <div>
      <ToastContainer theme='dark'/>
      <Header/>
      <BlogList/>
      <Footer/>
    </div>
  )
}

export default Home

