import mongoose from "mongoose";

const connectDB = async() => {
  await mongoose.connect(process.env.MONGOOSE_URL);
}

connectDB().then(()=>{
    console.log(`connected to DB`)
}).catch(err => console.log(err));

export default connectDB;