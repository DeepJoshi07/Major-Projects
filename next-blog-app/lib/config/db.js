import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
}

connectDB().then(()=>{
    console.log('connected to database')
}).catch((e)=>{
    console.log(e)
})

export default connectDB;