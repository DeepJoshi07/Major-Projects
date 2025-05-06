import Post from '../models/post.js'
import uploadOnCloudinary from '../config/cloudinary.js';
import { io } from '../index.js';
import Notification from '../models/notification.js';

export const createPost = async(req,res) =>{
    try {
        const {description} = req.body;
        let newPost;
        if(req.file){
            let image = await uploadOnCloudinary(req.file.path)
            newPost = await new Post({
                author:req.userId,
                description,
                image
            })
            
        }else{
            newPost = await new Post({
                author:req.userId,
                description,
            })
        }
        newPost.save()

        return res.status(201).json(newPost)
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async(req,res)=>{
    try {
        const post = await Post.find()
        .populate("author","firstName lastName userName profileImage headline")
        .populate("comment.user","firstName lastName profileImage ")
        .sort({createdAt:-1})
        
        io.emit('posts',{post})
        return res.status(200).json(post)
    } catch (error) {

        console.log(error);
        return res.status(500).json({message:"getpost error"})
    }
}

export const like = async(req,res)=>{
    try {
        const userId = req.userId
        const postId = req.params.id
        
        
        let post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message:'post does not exists'})
        }
        if(post.like.includes(userId)){
           post.like = post.like.filter((id)=> id != userId)
        }else{
            post.like.push(userId)
            if(post.author != userId){
                const notification = await new Notification({
                    reciever:post.author,
                    type:"like",
                    relatedUser:userId,
                    relatedPost:postId
                })
                notification.save()
            }
           
        }
        post.save()
        io.emit("likeUpdated",{postId,likes:post.like})
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message:`like error ${error}`})
    }
}

export const comment = async(req,res)=>{
    try {
        const userId = req.userId
        const postId = req.params.id
        const {content} = req.body
        let post = await Post.findByIdAndUpdate(postId,{
            $push:{comment:{content,user:userId}}
        },{new:true}).populate("comment.user","firstName lastName profileImage headline")
        
        if(!post){
            return res.status(400).json({message:'post does not exists'})
        }
        io.emit("commentUpdated",{postId,comment:post.comment})
        if(post.author != userId){
            const notification = await new Notification({
                reciever:post.author,
                type:"comment",
                relatedUser:userId,
                relatedPost:postId
            })
            notification.save()
        }
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message:`comment error ${error}`})
    }
}