import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    JWTtoken:{
        type:String
    },
    bio:{
        type:String,
    },
    avatar:{
        type:String
    }
},{timestamps:true})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateJsonWebToken = async function(req, res){
    const token = jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKEN_SECRET_EXPIRES_IN})

    this.token = token
    await this.save()
    return token
}

export const User = mongoose.model("User", userSchema)