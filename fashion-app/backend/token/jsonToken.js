import jwt from 'jsonwebtoken'


const createToken = (id) => {
    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}

export default createToken;