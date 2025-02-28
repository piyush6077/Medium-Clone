import { Post } from "../model/post.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createPost = async(req,res) => {
    try {
        const {title , content ,status} = req.body
        if(!title || !content){
            return res.status(400).json({success: false , message:"Post cannot be created withoud Title and Content"})            
        }       

        let postUrl = [];
        if(req.files && req.files["image"]){
            const uploadFiles = req.files["image"]
            console.log(uploadFiles)
            for ( const file of uploadFiles){
                const postFiles = await uploadOnCloudinary(file.path)
                console.log(postFiles)
                if(postFiles){
                    postUrl.push(postFiles.url)
                }
            }
        }

        const authorOfPost = req.user?._id
        if(!authorOfPost) return res.status(400).json({success:false, message:"Unauthorized : User not loggedIn"})

        const post = await Post.create({
            title,
            content,
            image:postUrl,
            author: authorOfPost,
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
    const { id: postId } = req.params;
    const {content , title } = req.body

    if(!postId) {
        return res.status(400).json({success:false , message:"Failed to get Post id"})
    }

    const updatedPost = await Post.findByIdAndUpdate(postId,
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
        const { id: postId } = req.params
        const user = req.user?._id
    
        if(!postId) return res.status(400).json({success:false , message:"Post not found"}) 
        if(!user) return res.status(400).json({success: false , message:"Log in to delete the post"})
    
        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({success:false , message:"Post Not found"})
        if(post.author.toString() !== user.toString()) return res.status(400).json({success:false , message:"You cannot delete another author post"})
            
        await Post.findByIdAndDelete(postId)
    
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
      const { id:postId } = req.params
      
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