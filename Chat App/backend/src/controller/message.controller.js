import User from "../models/user.js"
import Message from '../models/message.js'
import cloudinary from '../config/cloudinary.js'
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const filteredUsers = await User.find({id:{
            $ne:req.user._id
        }}).select('-password');
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'internal server error'})
    }
}


export const getMessages = async(req,res) => {
    try {
        const userTochat = req.params.id; //id of user we are chatting with
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {receiverId:userTochat, senderId:myId},
                {receiverId:myId,senderId:userTochat}
            ]
        })

        res.status(201).json(messages)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'internal server error'})
    }
}


export const sendMessages = async(req,res) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await new Message({
            receiverId,
            senderId,
            text,
            image:imageUrl
        })
        await newMessage.save()
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'internal server error'})
    }
}