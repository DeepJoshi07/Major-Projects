import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";

import PlaceOrder from "./pages/placeOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div id="app" className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
