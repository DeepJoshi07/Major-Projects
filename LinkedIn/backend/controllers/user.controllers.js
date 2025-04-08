import User from "../models/user.js";

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