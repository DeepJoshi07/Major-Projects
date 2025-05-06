import express from "express"
import env from "dotenv"
import cors from "cors"
import connectDb from './config/connectDb.js'
import authRouter from "./routes/authRoutes.js"
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import cookieParser from "cookie-parser"
import connectionRouter from "./routes/connectionRoutes.js"
import http from 'http'
import { Server } from "socket.io"
import notificationRouter from "./routes/notificationRoutes.js"
env.config()

const app = express()
app.use(cors({
    origin:"https://linkedin-frontend-7u4c.onrender.com",
    credentials:true
}))


const server = http.createServer(app);
export const io = new Server(server,{
    cors:{
        origin:"https://linkedin-frontend-7u4c.onrender.com",
        credentials:true
    }
})
export const userSocketMap = new Map();
io.on('connection',(socket)=>{
    socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
    })
    socket.on('disconnect',(socket)=>{

    })
})

const port = process.env.PORT || 5000;



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.use("/",authRouter)
app.use("/user",userRouter)
app.use("/data",postRouter)
app.use('/connection',connectionRouter)
app.use('/notification',notificationRouter)


server.listen(port,()=>{
    connectDb()
    console.log("app is listening");
    
})
