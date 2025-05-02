import { io, userSocketMap } from '../index.js'
import Connection from '../models/connection.js'
import User from '../models/user.js'

export const sendConnection = async(req,res)=>{
    try {
        let {id} = req.params //userid who wrote the post
        let sender = req.userId

        let user = await User.findById(sender);

        if(sender == id){
            return res.status(400).json({message:'you are the same user'})
        }
        if(user.connection.includes(id)){
            return res.status(400).json({message:'you are already connected'})
        }

        let existingConnection = await Connection.findOne({
            sender,
            receiver:id,
            status:"pending"
        })
        if(existingConnection){
            return res.status(400).json({message:'your request is already pending'})
        }
        let newConnection = await new Connection({
            sender,
            receiver:id,
        })
        newConnection.save();
        
       
        
        let receiverSocketId = userSocketMap.get(id);
        let senderSocketId = userSocketMap.get(sender);

        if(receiverSocketId){
            io.to(receiverSocketId)
            .emit("statusUpdated",{updatedUserId:sender,newStatus:'received'})
           
        }
        if(senderSocketId){
            io.to(senderSocketId)
            .emit("statusUpdated",{updatedUserId:id,newStatus:'pending'})
        }

        return res.status(200).json(newConnection)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:`connection send error ${error}`})
    }
}


export const acceptConnection = async(req,res)=>{
    try {
        let {id} = req.params //connection id(model)
        const userId = req.userId

        let connection = await Connection.findById(id);
        if(!connection){
            return res.status(400).json({message:`connection does not  exists`})
        }
        if(connection.status !== 'pending'){
            return res.status(400).json({message:`connection already under proccess`})
        }
        connection.status = 'accepted'
        connection.save()

        await User.findByIdAndUpdate(userId,{
            $addToSet:{connection:connection.sender._id}
        })

        await User.findByIdAndUpdate(connection.sender._id,{
            $addToSet:{connection:userId}
        })

        let receiverSocketId = userSocketMap.get(connection.receiver._id.toString());
        let senderSocketId = userSocketMap.get(connection.sender._id.toString());

        if(receiverSocketId){
            io.to(receiverSocketId)
            .emit("statusUpdated",{updatedUserId:connection.sender._id,newStatus:'disconnect'})
        }
        if(senderSocketId){
            io.to(senderSocketId)
            .emit("statusUpdated",{updatedUserId:userId,newStatus:'disconnect'})
        }

        return res.status(200).json({message:"connection accepted"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:`connection accept error ${error}`})
    }
}


export const rejectConnection = async(req,res)=>{
    try {
        let {id} = req.params //connection id(model)
        const userId = req.userId

        let connection = await Connection.findById(id);
        if(!connection){
            return res.status(400).json({message:`connection does not  exists`})
        }
        if(connection.status !== 'pending'){
            return res.status(400).json({message:`connection already under proccess`})
        }
        connection.status = 'rejected'
        const senderId = userSocketMap.get(connection.sender._id.toString())
        io.to(senderId).emit("rejectedStatus",{status:"connect"})
        connection.save()

        return res.status(200).json({message:"connection rejected by user"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:`connection rejected error ${error}`})
    }
}


export const getConnectionStatus = async(req,res)=>{
    try {
        const targetUserId = req.params.id; //id of the user we sent request to
        const currentUserId = req.userId;

        const currentUser = await User.findById(currentUserId);
        if(currentUser.connection.includes(targetUserId)){
            return res.json({status:'disconnect'})
        }
        const pendingRequest = await Connection.findOne({
            $or:[
                {sender:currentUserId,receiver:targetUserId},
                {sender:targetUserId,receiver:currentUserId}
            ],
            status:'pending'
        });

        if(pendingRequest){
            if(pendingRequest.sender.toString() == currentUserId.toString()){
                return res.json({status:'pending'})
            }else{
                return res.json({status:'received',requestId:pendingRequest._id})
            }
        }

        return res.json({status:"connect"})        
        //if no connection or pending req found

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:`connection status error ${error}`})
    }
}


export const removeConnection = async(req,res)=>{
    try {
        const id = req.userId;
        const otherUserId = req.params.id; //id of the user we want to disconnect

        await User.findByIdAndUpdate(id,
            { $pull: {connection:otherUserId}});
        await User.findByIdAndUpdate(otherUserId,
            { $pull: {connection:id}});
        
            let receiverSocketId = userSocketMap.get(otherUserId);
            let senderSocketId = userSocketMap.get(id);
    
            if(receiverSocketId){
                io.to(receiverSocketId)
                .emit("statusUpdated",{updatedUserId:id,newStatus:'connect'})
            }
            if(senderSocketId){
                io.to(senderSocketId)
                .emit("statusUpdated",{updatedUserId:otherUserId,newStatus:'connect'})
            }

        return res.json({message:'connection removed successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'remove connection error'})
        
    }
}


export const getConnectionRequests = async (req,res) => {
    try {
        const userId = req.userId;

        const requests = await Connection.find({receiver:userId, status:'pending'})
        .populate('sender',"firstName lastName email userName profileImage headline")

        return res.status(200).json(requests);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`getConnectionRequests error ${error}`})
    }
}


export const getUserConnections = async (req,res) => {
    try {
        const id = req.userId;

        const user = await User.findById(id)
        .populate("connection","firstName lastName userName profileImage headline connections");

        return res.status(200).json(user.connection)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`getUserConnections error ${error}`})
        
    }
}