import React from 'react'

function SubscriptionTableItem({email,deleteEmail,mongoId,date}) {
  return (
    <tr className='bg-white border-b text-left'>
      <th className=' px-6 py-4 font-medium text-gray-900 whitespace-nowrap' scope='row'>
        {email?email:'No Email'}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{new Date(date).toDateString()}</td>
      <td 
        onClick={()=>deleteEmail(mongoId)}
        className='px-6 py-4 cursor-pointer'>{'x'}</td>
    </tr>
  )
}

export default SubscriptionTableItem
