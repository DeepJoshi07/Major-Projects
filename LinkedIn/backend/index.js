import express from "express"
import env from "dotenv"
import cors from "cors"
import connectDb from './config/connectDb.js'
import authRouter from "./routes/authRoutes.js"
import userRouter from './routes/userRoutes.js'
import cookieParser from "cookie-parser"
const app = express()
const port = process.env.PORT || 5000;


env.config()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.use("/",authRouter)
app.use("/user",userRouter)


app.listen(port,()=>{
    connectDb()
    console.log("app is listening");
    
})