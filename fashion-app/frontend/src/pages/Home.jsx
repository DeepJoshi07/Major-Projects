import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Login from './Login'

const Home = () => {
  const {token} = useContext(ShopContext)
  if(token == undefined || token == ''){
    return <>
    <Login/>
    </>
  }else{
     return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
  }
 
}

export default Home
