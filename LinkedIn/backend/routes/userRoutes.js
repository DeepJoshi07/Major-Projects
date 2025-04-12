import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import upload from "../middleware/multer.js"
import { getUserData, updateUserData } from '../controllers/user.controllers.js';


const userRouter = express.Router();

userRouter.get("/userdata",checkAuth,getUserData);
userRouter.put("/updateuserdata",checkAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateUserData);

export default userRouter;