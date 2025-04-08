import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { getUserData } from '../controllers/user.controllers.js';


const userRouter = express.Router();

userRouter.get("/userdata",checkAuth,getUserData);

export default userRouter;