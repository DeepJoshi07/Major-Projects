import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

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

    await User.findByIdAndUpdate(userId, { cartData });
    res.json("Added to cart");
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = async (req, res) => {
  try {
    
    const { userId } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });

    res.json("Cart Updated!");
  } catch (error) {
    console.log(error);
  }
};
