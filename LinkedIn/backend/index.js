import express from "express"
import env from "dotenv"
import cors from "cors"
import connectDb from './config/connectDb.js'
import authRouter from "./routes/authRoutes.js"

const app = express()
const port = process.env.PORT || 5000;


env.config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use("/",authRouter)

app.get("/",(req,res)=>{
    connectDb()
    res.send("app has been created")
})

app.listen(port,()=>{
    console.log("app is listening");
    
})