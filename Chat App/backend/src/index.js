import express from 'express'
import env from 'dotenv'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import connectDb from './config/connect.js'
import cookieparser from 'cookie-parser'

env.config()
const port = process.env.PORT 
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())


app.use("/auth",userRouter)
app.use("/message",messageRouter)

app.listen(port,()=>{
    connectDb()
    console.log(`your app is listening on port ${port}`);
    
})