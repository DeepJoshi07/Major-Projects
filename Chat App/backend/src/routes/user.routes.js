import express from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controller/user.controller.js';
import {protectRoute} from '../middleware/protectRoute.js';

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.put('/update-profile',protectRoute,updateProfile)
userRouter.get('/check',protectRoute,checkAuth)


export default userRouter;