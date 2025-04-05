import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    skills:[
        {type:String}
    ],
    education:[
        {
            college:String,
            degree:String,
            fieldOfStudy:String
        }
    ],
    location:{
        type:String
    },
    gender:{
        type:String,
        enum:["male",'female','other']
    },
    experience:[
        {
            title:String,
            company:String,
            description:String
        }
    ],
    connection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }


    ]

})

const User = mongoose.model("User",userSchema);

export default User;