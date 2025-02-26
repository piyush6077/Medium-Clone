import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]
        if(!token) return res.status(401).json({success:false, message:"Unauthorized"})
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({success:false, message:"Invalid Token"})
    
        const user = await User.findById(decoded?._id)
        if(!user) return res.status(400).json({success:false , message:"User Not Found"})
        
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}