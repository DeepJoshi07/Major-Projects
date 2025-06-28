import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import createToken from "../token/jsonToken.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json("please provide all details");
    }

    if (!validator.isEmail(email)) {
      res.status(400).json("Please provide valid Email!");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400).json("User already exists!");
    }

    if (password.length < 8) {
      res.status(400).json("Password must be of 8 characters or longer");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({message:"You have Registered!",success:"true",token});
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json("please provide all details");
    }

    if (!validator.isEmail(email)) {
      res.status(400).json("Please provide valid Email!");
    }

    const exist = await User.findOne({ email });
    if (!exist) {
      res.status(400).json("User does not exists!");
    }

    if (password.length < 8) {
      res.status(400).json("Password must be of 8 characters or longer");
    }

    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      res.status(400).json("Password is incorrect");
    }

    const token = createToken(exist._id);

    res.json({message:"You have loggedin!",success:"true",token});
  } catch (error) {
    console.log(error.message);
  }
};

export const userLogout = async(req,res) => {
  try {
    console.log("called!")
    res.clearCookie("fashion")
    res.json({message:'You have been logged-out!',success:"true"})
  } catch (error) {
    console.log(error.message)
  }
}

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      res.json("Please provide valid email!");
    }
    if (!email || !password) {
      res.json("Please provide all credantials!");
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      
      res.json("Loggedin successfuly!");
    }else{
        res.json({message:"invalid cradentials!",token})
    }
  } catch (error) {
    console.log(error.message);
  }
};

