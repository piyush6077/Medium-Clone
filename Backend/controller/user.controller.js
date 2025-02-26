import { User } from "../model/user.model.js";

export const handleSignUp = async(req, res) => {
    try {
        const {username, email , password} = req.body;
        if(!username || !email || !password) return res.status(400).json({success:false, message:"Must fill all details to login"})
    
        const existingUser = await User.findOne({
            $or: [{username}, {email}]
        })
        if(existingUser) return res.status(400).json({success:false, message:"User already exists"})
    
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password
        })
        if(!user) return res.status(400).json({success:false, message:"User could not be created"})

        const createdUser = await User.findOne({
            $or: [{username}, {email}]
        }).select("-password")

        return res.status(200).json({success:true, message:"User created successfully" , createdUser})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }

}

export const handleLogin = async(req, res) => {
    
    try {
        const {username , email , password } = req.body;
        if(!username || !email || !password) return res.status(400).json({success:false, message:"Must fill all details to login"})
     
        const user = await User.findOne({
            $or: [{username}, {email}]
        })
        if(!user) return res.status(400).json({success:false, message:"User does not exist"})
    
        const isPasswordValid = await user.isPasswordValid(password)
        if(!isPasswordValid) return res.status(400).json({success:false, message:"Invalid password"})
    
        const token = user.generateJsonWebToken()
        const loggedInUser = await User.findById(user._id).select("-password -token") 

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }

        return res
        .status(200)
        .cookie("token", token,options)     
        .json({success:true, message:"User logged in successfully", loggedInUser})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const handleLogout = async(req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({success:true, message:"User logged out successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const getUser = async(req, res) => {
    return res.status(200).json({success:true, message:"User fetched successfully", user: req.user})
}