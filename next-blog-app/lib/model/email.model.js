import mongoose from "mongoose";

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Email = mongoose.models.email || mongoose.model('Email',emailSchema)

export default Email;