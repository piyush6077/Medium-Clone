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
    try {
        const {paramId} = req.params
        const user = req.user?._id
    
        if(!paramId) return res.status(400).json({success:false , message:"Post not found"}) 
        if(!user) return res.status(400).json({success: false , message:"Log in to delete the post"})
    
        if(paramId !== user) return res.status(400).json({success:false , message:"You cannot delete another author post"})
    
        const deletePost = await Post.findByIdAndDelete(paramId)
        if(!deletePost) return res.status(400).json({success: false , message:"The post to be delete cannot be found"})
    
        return res
        .status(200)
        .json({success:true , message:"Post deleted successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message:"Internal Server Error"})
    }
}

export const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        return res.status(200).json({success: true , message:"All post fetch successfully" , posts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const getPostById = async(req, res) => {
    try {
      const {postId} = req.params
      
      const post = await Post.findById(postId)
      if(!post){
        return res.status(400).json({success: false , message: "Post Not Found"})
      }

      return res
      .status(200)
      .json({success: true , post})
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false , message: "Internal Server Error"})
    }
}