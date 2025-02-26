import jwt from "jsonwebtoken"

export const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        if(!token) return res.status(401).json({success:false, message:"Unauthorized"})
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({success:false, message:"Unauthorized Token"})
    
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}