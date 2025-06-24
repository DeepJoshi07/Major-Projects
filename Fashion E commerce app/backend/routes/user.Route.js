import express from 'express'
import { loginUser, registerUser } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.post("/registerUser",registerUser)
userRouter.post("/loginUser",loginUser)

export default userRouter;