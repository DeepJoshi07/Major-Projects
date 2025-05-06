import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profileImage:{
        type:String,
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;