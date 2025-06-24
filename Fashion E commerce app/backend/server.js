import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.Route.js'
import connectCloudinary from './config/cloudinary.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/user',userRouter)

app.get("/",(req,res)=>{
    res.send("app is working fine")
})

app.listen(port,()=>{
    connectDB()
    connectCloudinary()
    console.log(`Your app is listening on port ${port}`)
})