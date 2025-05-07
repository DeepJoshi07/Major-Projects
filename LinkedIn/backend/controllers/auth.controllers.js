import User from '../models/user.js'
import bcrypt from 'bcrypt'
import newToken from '../token/accessToken.js';
import env from "dotenv"
env.config()

export const signup = async(req,res)=>{
    try {
        let {firstName,lastName,userName,email,password} = req.body;
        if(!firstName || !lastName || !userName || !email || !password){
            return res.status(400).json({message:"please send all required details"})
        }
        const exists = await User.findOne({email});

        if(exists){
            return res.status(400).json({message:"user already exists!"})
        }
        if(password.length < 8){
            return res.status(401).json({message:"password is short"})
        }
        let newPass = await bcrypt.hash(password,10);

        const user = await new User({
            firstName,
            lastName,
            userName,
            email,
            password:newPass,
        })

        const token = await newToken(user.id);
        res.cookie("accessLinkedIn",token,{
            httpOnly:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            secure:process.env.NODE_ENV == "production"
        })
        user.save();
        return res.status(201).json({message:"user has been created"})
    } catch (error) {
        return res.status(401).json({message:"signup error"})
    }
}

export const login = async(req,res)=>{
    try {
        let {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"please send all required details"})
        }
        const exists = await User.findOne({email});

        if(!exists){
            return res.status(400).json({message:"user does not exists!"})
        }
        const match = await bcrypt.compare(password,exists.password);
        if(!match){
            return res.status(401).json({message:"password is incorrect!"})
        }
        const token = await newToken(exists.id);
        res.cookie("accessLinkedIn",token,{
            httpOnly:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            secure:process.env.NODE_ENV == "production"
        })
        return res.status(200).json({message:"user has logged in"})
    } catch (error) {
        return res.status(401).json({message:"login error"})
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("accessLinkedIn");
        return res.status(200).json({message:"user has logout"})
    } catch (error) {
        return res.status(401).json({message:"logout error"})

    }
    
}
