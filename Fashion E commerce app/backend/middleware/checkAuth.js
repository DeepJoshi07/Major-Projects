import jwt from 'jsonwebtoken'

const checkAuth = async(req,res,next) => {
    try {
        const {fashion} = req.cookies;
        if(!fashion){
            return res.json('Not Authorized Login Again!')
        }
        const token_decode = jwt.verify(fashion,process.env.JWT_SECRET);
        if(!token_decode){
            return res.json('Not Authorized Login Again!')
        }
        console.log(token_decode)
        // req.userId = token_decode.user
        console.log("worked!")
        next()
    } catch (error) {
        console.log(error.message)
    }
}
export default checkAuth;