import express from 'express'
import {protectRoute} from '../middleware/protectRoute.js';
import { getMessages, getUsersForSidebar, sendMessages } from '../controller/message.controller.js';

const messageRouter = express.Router()

messageRouter.get("/users",protectRoute,getUsersForSidebar)
messageRouter.get("/:id",protectRoute,getMessages)
messageRouter.post("/send/:id",protectRoute,sendMessages)


export default messageRouter;