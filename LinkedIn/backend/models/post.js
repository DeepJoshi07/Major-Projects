import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    description:{
        type:String,
        default:""
    },
    image:{
        type:String
    },
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comment:[
        {
            content:{
                type:String
            },
            user:{
                 type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]

},{timestamps:true})

const Post = mongoose.model('Post',postSchema);

export default Post;