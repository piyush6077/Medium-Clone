import { Post } from "../model/post.model"

export const createComment = async(req, res) => {
    try {
        const { content } = req.body
        const user = req.user?._id
        const { id: postId} = req.params
    
        if(!content) res.status(400).json({success:false , message:"Comment cannot be created without text"})
        if(!user) res.status(400).json({success:false , message:"Login to comment on this post"})
    
        const comment = await Comment.create({
            post: postId,
            user,
            content
        })
    
        await Post.findByIdAndUpdate(postId, 
            {
                $push: {
                comment: comment._id
                }
            }
        )
    
        return res.status(200).json({ success: true, message: "Comment added successfully", comment });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message:"Internal server Error"})       
    }
}


export const deleteComment = async (req, res) => {
    try {
        const user = req.user?._id
        const { commentId } = req.params

        const comment = await Comment.findById(commentId)
        if(!comment) return res.status(404).json({success: false, message:"Comment not found"})

        if(comment.user.toString() !== user.toString()){
            return res.status(403).json({success: false , message:"You cannot delete the Comment"})
        }

        await comment.findByIdAndDelete(commentId)
        await Post.updateOne(
            {comment: commentId},
            {
                $pull:{
                    comment: commentId
                }
            }
        ) 
        // Note : we can also use findByIdAndUpdate here just wanted to try it

        return res
        .status(200)
        .json({success:true , message:"Comment Deleted Successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message:"Internal server Error"})       
    }       
}


export const getAllComments = async(req,res) => {
    try {
        const { id: postId } = req.params

        const AllComments = await Comment.find({post: postId}).populate("user" , "username email").sort({createdAt: -1})

        return res
        .status(200)
        .json({success:"true", AllComments})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message:"Internal server Error"})            
    }
}