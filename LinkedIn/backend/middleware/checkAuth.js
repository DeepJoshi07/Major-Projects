import jwt from "jsonwebtoken"
import env from "dotenv"

export const checkAuth = async(req,res,next) => {
    try {
        const {accessLinkedIn} = req.cookies;
        if(!accessLinkedIn){
            return res.status(401).json({message:"please log in!"})
        }
        const verify = await jwt.verify(accessLinkedIn,process.env.JWT_SECRET)
        if(!verify){
            return res.status(401).json({message:"invalid token"})
        }
        
        req.userId = verify.id;
        
    } catch (error) {
        console.log(error);
    }
    next()
}