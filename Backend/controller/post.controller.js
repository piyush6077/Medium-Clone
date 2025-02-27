import { Post } from "../model/post.model.js"

export const createPost = async(req,res) => {
    try {
        const {title , content , image , status} = req.body
        if(!title || !content){
            return res.status(400).json({success: false , message:"Post cannot be created withoud Title and Content"})            
        }       

        const authorOfPost = req.user?._id
        if(!authorOfPost) return res.status(400).json({success:false, message:"Unauthorized : User not loggedIn"})

        const post = await Post.create({
            title,
            content,
            image,
            author : authorOfPost,
            status 
        })
 
        return res
        .status(200)
        .json({success: true , message:"Post created successfully" , post})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, message:"Internal Server Error"})
    }

}

export const updatePost = async(req,res) => {
    const {postId} = req.params
    const {content , title } = req.body

    if(!postId) {
        return res.status(400).json({success:false , message:"Failed to get Post id"})
    }

    const updatedPost = await Post.findByIdAndUpdate(post?._id,
        {
            $set: {
                title,
                content
            }
        },{new: true ,  runValidators: true }
    )
// NOTE: runValidator enforced the conditon such as required: true , unique : true when 
//       updating the content / Post

    if(!updatedPost){
        return res.status(400).json({success:false , message:"Post not found"})
    }

    return res
    .status(200)
    .json({success:true , message:"Post Updated successfully"})
}


export const deletePost = async(req,res) => {

}

export const getAllPosts = async(req,res) => {
    
}