import express from 'express'
import { adminLogin, loginUser, registerUser } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.post("/registerUser",registerUser)
userRouter.post("/loginUser",loginUser)
userRouter.post("/adminLogin",adminLogin)


export default userRouter;