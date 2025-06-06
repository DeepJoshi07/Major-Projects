import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const connectionSchema = new Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }

},{timestamps:true})

const Connection = mongoose.model("Connection",connectionSchema);

export default Connection;