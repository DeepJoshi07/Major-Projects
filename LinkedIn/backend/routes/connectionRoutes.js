import express from 'express'
import { acceptConnection, 
    getConnectionRequests, 
    getConnectionStatus, 
    getUserConnections, 
    rejectConnection, 
    removeConnection, 
    sendConnection } from '../controllers/connection.controllers.js';
import {checkAuth} from '../middleware/checkAuth.js'
const connectionRouter = express.Router()

connectionRouter
.post('/send/:id',checkAuth,sendConnection)//id of the post owner

connectionRouter
.put('/accept/:id',checkAuth,acceptConnection)//connection id(model)

connectionRouter
.put('/rejected/:id',checkAuth,rejectConnection)//connection id(model)

connectionRouter
.get('/getstatus/:id',checkAuth,getConnectionStatus)//id of the user we sent request to

connectionRouter
.delete('/remove/:id',checkAuth,removeConnection)//id of the user we want to disconnect

connectionRouter
.get('/requests/',checkAuth,getConnectionRequests)

connectionRouter
.get('/',checkAuth,getUserConnections)


export default connectionRouter;