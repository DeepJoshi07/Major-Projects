import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { useEffect } from "react"

function Verify() {
    const {backendUrl, navigate, token, setCartItems} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async() =>{
        try {
            if(!token){
                return null;
            }
            const result = await axios.post(backendUrl + '/order/verify-stripe', {success,orderId},{headers:{token}} )
            console.log(result)
            if(result.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
    </div>
  )
}

export default Verify
