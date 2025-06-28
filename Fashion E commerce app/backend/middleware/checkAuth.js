import jwt from 'jsonwebtoken'

const checkAuth = async(req,res,next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.json('Not Authorized Login Again!')
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!token_decode){
            return res.json('Not Authorized Login Again!')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}
export default checkAuth;