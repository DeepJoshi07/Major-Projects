import Order from '../model/orderModel.js'
import User from "../model/userModel.js"

export const placeOrder = async (req, res) => {
  try {

    const {userId,items,amount,address} = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod:"COD",
      payment:false,
      date:Date.now()
    }

    const newOrder = await new Order(orderData)
    await newOrder.save();

    await User.findByIdAndUpdate(userId,{cartData:{}})

    res.json({message:"Order Placed!",success:true})
  } catch (error) {
    console.log(error);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})

    res.json({message:"Here is your order's list",success:true,orders})
  } catch (error) {
    console.log(error);
  }
};

export const userOrders = async (req, res) => {
  try {
    const {userId} = req.body;

    const orders = await Order.find({userId})

    res.json({message:'Your Orders',success:true,orders})

  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const {orderId,status} = req.body;
    await Order.findByIdAndUpdate(orderId,{status});

    res.json({message:"Status Updated!",success:true})
  } catch (error) {
    console.log(error);
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
