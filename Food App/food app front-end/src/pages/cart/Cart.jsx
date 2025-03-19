import { useContext } from 'react'
import {StoreContext} from '../../context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
function Cart() {
  const{cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((items,index)=>{
            if(cartItems[items._id]>0){
              return (
                <div key={index} >
                    <div className='cart-items-title cart-items-item'>
                      <img src={items.image} alt="" />
                      <p>{items.name}</p>
                      <p>${items.price}</p>
                      <p>{cartItems[items._id]}</p>
                      <p>${items.price * cartItems[items._id]}</p>
                      <p className='cross' onClick={()=>removeFromCart(items._id)}>x</p>
                    
                  </div>
                  <hr />
                </div>
                
              
              )
            }
          })
        }
      </div>
      <div className='cart-bottom'>
        <div className="cart-total">
          <h2>Cart total</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Delivery fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 :getTotalCartAmount()+2}</p>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode enter it below</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
