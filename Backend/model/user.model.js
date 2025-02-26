import mongoose , {Schema} from "mongoose";
import bcryptjs from "bcryptjs"
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name:{
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
    bio:{
        type:String,
    },
    avatar:{
        type:String
    }
},{timestamps:true})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(password, 10)
    }
    next()
})

userSchema.method.isPasswordValid = async function(password){
    return await bcrypt.compare(password , this.password)
}


export const User = mongoose.model("User", userSchema)