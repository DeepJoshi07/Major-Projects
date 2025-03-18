import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";

import PlaceOrder from "./pages/placeOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
  return (
    <>
      <div id="app">
        <Navbar />
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
