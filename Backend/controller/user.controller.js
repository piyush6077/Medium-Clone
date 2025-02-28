import { v2 as cloudinary} from "cloudinary";
import { User } from "../model/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
    
        const token = await user.generateJsonWebToken()
        const loggedInUser = await User.findById(user._id).select("-password -token") 

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }

        return res
        .cookie("token", token , options)     
        .status(200)
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

export const getUserProfile = async(req, res) => {
    return res.status(200).json({success:true, message:"User fetched successfully", user: req.user})
}

export const updateUserProfile = async(req,res) =>{ 
    try {
        const {username, bio , avatar } = req.body
        const user = req.user?._id
        
        const existingUser = await User.findById(user)
        if(!existingUser) return res.status(404).json({success:false , message:"Login to change Avatar"})

        let avatarUrl = existingUser.avatar || "";
        if(req.files?.["avatar"]?.[0]?.path){

            if(existingUser.avatar){
                const oldImagePublicId = existingUser.avatar.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(oldImagePublicId)
            }

            const avatarFile = await uploadOnCloudinary(req.files?.["avatar"]?.[0]?.path)
            if(avatarFile.url){
                avatarUrl = avatarFile.url
            }
        }
        console.log(avatarUrl)
        
        const updateUser = await User.findByIdAndUpdate(user,
            {
                $set: {
                    username: username,
                    bio: bio,
                    avatar:avatarUrl
                }
            },{new: true}
        ).select("-password -token")
        if(!updateUser) return res.status(400).json({success:false, message:"Error occured during updating the user"})

        return res
        .status(200)
        .json({success:true , message:"User Profile Updated successfully", updateUser})    
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({succes:false, message:"Unable to Update User profile"})
    }
}  