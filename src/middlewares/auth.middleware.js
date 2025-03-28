import jwt from 'jsonwebtoken'
import  User  from '../Models/user.js'

const verifyToken = async function(req,res,next){
 try {
       const token = req.cookies?.acessToken
            if(!token){
           return res.status(401).json({
               message:"Token not Found"
           })}
       
           const decode = jwt.verify(token,process.env.ACESS_TOKEN_SECRET)
           const user = await User.findById(decode._id)
           if(!user){
               return res.status(401).json({
                   message:"User not found"
               })
           }
           req.user = user
           next()
       }
  catch (error) {
    return res.status(500).json({
        message:"auth server failed"
    })
 }
}
export { verifyToken}