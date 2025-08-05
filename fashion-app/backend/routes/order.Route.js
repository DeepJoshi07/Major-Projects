import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpayOrder, verifyStripeOrder } from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'
import checkAuth from '../middleware/checkAuth.js'

const orderRouter = express.Router()

orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)


orderRouter.post("/place",checkAuth,placeOrder)
orderRouter.post("/stripe",checkAuth,placeOrderStripe)
orderRouter.post("/razorpay",checkAuth,placeOrderRazorpay)


orderRouter.post('/verify-stripe',checkAuth,verifyStripeOrder)
orderRouter.post('/verify-razorpay',checkAuth,verifyRazorpayOrder)


orderRouter.post("/userorders",checkAuth,userOrders)

export default orderRouter