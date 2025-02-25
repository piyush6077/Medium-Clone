import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User", 
    },
    content:{
        type:String,
        required:true
    },
    parentComment:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    }

},{timestamps: true}) 

export const Comment = mongoose.model("Comment", commentSchema)