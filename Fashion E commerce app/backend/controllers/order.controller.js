import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Stripe from "stripe";
import razorpay from 'razorpay'

const currency = "inr";
const delivery_fees = 10;

const stripe = new Stripe(process.env.STRIPE_SESSION_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET_ID,
})

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ message: "Order Placed!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.json({ message: "Here is your order's list", success: true, orders });
  } catch (error) {
    console.log(error);
  }
};

export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ userId });

    res.json({ message: "Your Orders", success: true, orders });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });

    res.json({ message: "Status Updated!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Online",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new Order(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_fees * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      mode: 'payment',
      line_items,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false});
  }
};

export const verifyStripeOrder = async(req,res) => {
  try {
    const {success, userId, orderId} = req.body;
    
    if(success === 'true'){
      await Order.findByIdAndUpdate(orderId,{payment:true})
      await User.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true})
    }else{
      await Order.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error)
  }
}

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Online",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new Order(orderData);
    await newOrder.save();

    const options = {
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt :newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options,(err,order)=>{
      
      if(err){
        console.log(err)
        return res.json({success:false,message:err})
      }
       return res.json({success:true,order})
    })
   
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:err.message})
  }
};

export const verifyRazorpayOrder = async(req,res) => {
  try {
    const {userId, razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      
      const id = orderInfo.receipt
      await Order.findByIdAndUpdate(id,{payment:true})
      await User.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true, message:'payment SuccessFul'})
    }else{
      res.json({success:false, message:'payment Failed'})
    }

  } catch (error) {
    console.log(error)
     return res.json({success:false,message:err.message})
  }
}