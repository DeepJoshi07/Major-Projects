import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next) => {
    try {
        const {adminCookie} = req.cookies;
        if(!adminCookie){
            return res.json('Not Authorized Login Again!')
        }
        const token_decode = jwt.verify(adminCookie,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json('Not Authorized Login Again!')
        }
        console.log("worked!")
        next()
    } catch (error) {
        console.log(error.message)
    }
}
export default adminAuth