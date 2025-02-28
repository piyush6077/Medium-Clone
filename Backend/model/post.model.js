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
        type:[String],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    likes: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]

},{timestamps:true})

export const Post = mongoose.model("Post", postSchema)