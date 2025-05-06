import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.js";
import cloudinary from '../config/cloudinary.js'


export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "please provide all credencials" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be of 6 characters or longer" });
    }

    let salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (user) {
      generateToken(user._id, res);
      await user.save();
    }
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide all credencials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }

    const isCorrect = await bcrypt.compare(password,user.password)

    if(!isCorrect){
        return res.json(400).json({ message: "invalid credencials" });
    }
    
    generateToken(user._id,res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "internal server error" });
  }
};


export const logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.json({message:"you have logged out"})
    } catch (error) {
        return res.json(500).json({ message: "internal server error" });
    }
};


export const updateProfile = async(req,res) => {
    try {
       const {profileImage} = req.body;
       const userId = req.user._id

       if(!profileImage){
        return res.status(400).json({message:'profile pic is required'})
       }

       const uploadResponse = await cloudinary.uploader.upload(profileImage);
       const user = await User.findByIdAndUpdate(userId,
        {
            profileImage:uploadResponse.secure_url
        },{
            new:true
        }).select('-password')

        res.status(500).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'internal server error'})
    }
}


export const checkAuth = (req,res) => {
    try {
        res.status(201).json(req.user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
}