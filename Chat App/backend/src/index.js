import express from 'express'
import env from 'dotenv'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import connectDb from './config/connect.js'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './lib/socket.js'

env.config()
const port = process.env.PORT 



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/auth",userRouter)
app.use("/messages",messageRouter)

server.listen(port,()=>{
    connectDb()
    console.log(`your app is listening on port ${port}`);
    
})