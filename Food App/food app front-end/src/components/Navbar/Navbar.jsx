import {Link} from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
function Navbar({setShowLogin}) {
    const [menu,setMenu] = useState('menu');
    const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <div>
        <div className="navbar">
            
            <Link to='/'><img src={assets.logo} className='logo-img' alt="" /></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={()=>setMenu('home')} className={menu === "home"?"active":""}>home</Link>
                <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu === "menu"?"active":""}>menu</a>
                <a href='#app-download'onClick={()=>setMenu('mobile-app')} className={menu === "mobile-app"?"active":""}>mobile-app</a>
                <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu === "contact-us"?"active":""}>contact-us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>sign up</button>
            </div>
        </div>
     
    </div>
  )
}

export default Navbar
