import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    published: {
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    likes: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]

},{timestamps:true})

export const Post = mongoose.model("Post", postSchema)