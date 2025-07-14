'use client'

import SubscriptionTableItem from '@/components/adminCOmponents/SubscriptionTableItem'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Subscriptions() {

  const [email,setEmail] = useState([])

  const fetchEmail = async() => {
    const result = await axios.get('/api/email')
    setEmail(result.data.emails)
  }
  
  const deleteEmail = async(id) => {
    const result = await axios.delete('/api/email',{params:{
      id
    }})
    if(result.data.success){
      toast.success(result.data.message)
      fetchEmail()
    }else{
      toast.error('something went wrong!')
    }
  }
  useEffect(()=>{
    fetchEmail()
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500 '>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscription
              </th>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{email.map((e,index)=>{
            return <SubscriptionTableItem key={index} deleteEmail={deleteEmail} mongoId={e._id} date={e.date} email={e.email}/>
          })}
            
          </tbody>
        </table>
      </div>



    </div>
  )
}

export default Subscriptions
