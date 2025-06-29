import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import checkAuth from '../middleware/checkAuth.js'

const cartRouter = express.Router()

cartRouter.post('/add',checkAuth,addToCart)
cartRouter.post('/get',checkAuth,getUserCart)
cartRouter.post('/update',checkAuth,updateCart)

export default cartRouter;