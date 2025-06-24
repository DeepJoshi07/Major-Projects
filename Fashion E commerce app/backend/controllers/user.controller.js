import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import createToken from '../token/jsonToken.js'

export const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            res.status(400).json('please provide all details')
        }

        if(!validator.isEmail(email)){
            res.status(400).json('Please provide valid Email!')
        }


        const exist = await User.findOne({email})
        if(exist){
            res.status(400).json('User already exists!')
        }

        if(password.length < 8){
            res.status(400).json('Password must be of 8 characters or longer')
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            email,
            name,
            password:hashPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)
        console.log(token)
        res.cookie('fashion',token,{
            maxAge:1000 * 60 * 60 * 24 * 7,
            secure:false,
            httpOnly:true,
            sameSite:process.env.NODE_ENV === "production"
        })

        res.json('You have Registered!')
    } catch (error) {
        console.log(error.message)
    }

}

export const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;

        if( !email || !password){
            res.status(400).json('please provide all details')
        }

        if(!validator.isEmail(email)){
            res.status(400).json('Please provide valid Email!')
        }

        const exist = await User.findOne({email})
        if(!exist){
            res.status(400).json('User does not exists!')
        }

        if(password.length < 8){
            res.status(400).json('Password must be of 8 characters or longer')
        }

       
        const isMatch = await bcrypt.compare(password,exist.password)
        if(!isMatch){
             res.status(400).json('Password is incorrect')
        }

        const token = createToken(exist._id)
        res.cookie('fashion',token,{
            maxAge:1000 * 60 * 60 * 24 * 7,
            secure:false,
            httpOnly:true,
            sameSite:process.env.NODE_ENV === "production"
        })

        res.json('You have loggedin!')
    } catch (error) {
        console.log(error.message)
    }


}