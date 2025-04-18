import Post from '../models/post.js'
import uploadOnCloudinary from '../config/cloudinary.js';

export const createPost = async(req,res) =>{
    try {
        const {description,like} = req.body;
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
        .populate("author","firstName lastName profileImage headline")
        .populate("comment.user","firstName lastName profileImage ")
        .sort({createdAt:-1})
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
        }
        post.save()
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
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message:`comment error ${error}`})
    }
}