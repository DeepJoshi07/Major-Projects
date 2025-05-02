import User from "../models/user.js";
import uploadOnCloudinary from '../config/cloudinary.js'

export const getUserData = async(req,res)=>{
    try {
        const id = req.userId;
        
        if(!id){
            return res.status(401).json({message:"user id is not provided"})
        }
        const user = await User.findById(id).select("-password");
        if(!user){
            return res.status(401).json({message:"user does not exists"})
        }
        
        return res.status(200).json({user})
    } catch (error) {
        console.log(error);
        
    }
}

export const updateUserData = async(req,res)=>{
    try {
        const {firstName,lastName,userName,email,headline,location,gender} = req.body;
        console.log(req.body);
        let skills = req.body.skills?JSON.parse(req.body.skills):[];
        let experience = req.body.experience?JSON.parse(req.body.experience):[];
        let education = req.body.education?JSON.parse(req.body.education):[];
        
        
        let profileImage;
        let coverImage;
        console.log(req.files);
        if(req.files.profileImage){
             profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
        }
        if(req.files.coverImage){
             coverImage = await uploadOnCloudinary(req.files.coverImage[0].path)
        }
        let user = await User.findByIdAndUpdate(req.userId,{
            firstName,
            lastName,
            userName,
            email,
            headline,
            location,
            gender,
            skills,
            education,
            experience,
            coverImage,
            profileImage
        },{new:true}).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"update profile error"})
    }
}

export const getProfile = async(req,res)=>{
    try {
        let {username} = req.params;
        const user = await User.findOne({userName:username}).select("-password")
        if(!user){
            return res.status(500).json({message:"user doesn't exists"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`GetProfile Erorr ${error}`})
    }
}

export const search = async(req,res) => {
    try {
        let {query} = req.query
        if(!query) {
            return res.status(400).json({message:'query is must to find users'})
        }
        const users = await User.find({
            $or:[
                {firstName:{$regex:query,$options:"i"}},
                {lastName:{$regex:query,$options:"i"}},
                {userName:{$regex:query,$options:"i"}},
                {skills:{$in:query}},
                
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        
    }
}

export const getSuggestedUser = async(req,res) => {
    try {
        const currUser = await User.findById(req.userId).select('connection')
        const users = await User.find({
            _id:{
                $ne:currUser,$nin:currUser.connection
            }
        }).select('-password')
        
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`getSuggestedUser error ${error}`})
    }
}