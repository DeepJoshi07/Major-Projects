import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import {assets} from '../assets/assets'
import axios from 'axios'

const Navbar = ({setToken}) => {
  const handleClick = async() => {
    try {
      await axios.post(backendUrl+"/user/adminLogout",{},{
        withCredentials:true
      })
      setToken('')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={handleClick} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar