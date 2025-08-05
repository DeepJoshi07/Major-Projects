import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (prop) => {
  const currency = "$";
  const delivery_fee = 10;
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("fashion") ? localStorage.getItem("fashion") : ""
  );

  useEffect(() => {
    localStorage.setItem("fashion", token);
  }, [token]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
       await axios.post(
          backendUrl + "/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const result = await axios.post(
        backendUrl + "/cart/get",
        {},
        { headers: { token } }
      );
      
      if (result.data.success) {
        setCartItems(result.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const result = await axios.get(backendUrl + "/product/list");

      setProducts(result.data.products);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    currency,
    delivery_fee,
    products,
    navigate,
    backendUrl,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    updateQuantity,
    cartItems,
    setCartItems,
    setToken,
    token,
    getCartCount,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>{prop.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
