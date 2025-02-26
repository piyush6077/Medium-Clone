import { User } from "../model/user.model";

export const handleSignUp = async(req, res) => {
    try {
        const {username, email , password} = req.body;
        if(!username && !email && !password) return res.status(400).json({success:false, message:"Must fill all details to login"})
    
        const existingUser = await User.findOne({
            $or: [{username}, {email}]
        })
        if(existingUser) return res.status(400).json({success:false, message:"User already exists"})
    
        const user = await User.create({
            username: username.toLowerCase(),
            eamil: email.toLowerCase(),
            password
        })
        if(!user) return res.status(400).json({success:false, message:"User could not be created"})

        return res.status(200).json({success:true, message:"User created successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }

}

export const handleLogin = async(req, res) => {

}

