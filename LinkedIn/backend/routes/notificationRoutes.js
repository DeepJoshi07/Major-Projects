import express from 'express'
import {checkAuth} from '../middleware/checkAuth.js'
import { deleteAllNotifications, deleteNotification, getNotifications } from '../controllers/notification.controllers.js'
const notificationRouter = express.Router()

notificationRouter.get('/get',checkAuth,getNotifications)
notificationRouter.delete('/deleteone/:id',checkAuth,deleteNotification)
notificationRouter.delete('/',checkAuth,deleteAllNotifications)

export default notificationRouter