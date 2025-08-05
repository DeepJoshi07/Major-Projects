import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.Route.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/product.Route.js'
import cartRouter from './routes/cart.Route.js'
import orderRouter from './routes/order.Route.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:[
        "https://fashion-frontend-six.vercel.app",
        "http://localhost:5174",
    ],
    credentials:true
}))

app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)

app.get("/",(req,res)=>{
    res.send("app is working fine")
})

app.listen(port,()=>{
    connectDB()
    connectCloudinary()
    console.log(`Your app is listening on port ${port}`)
})