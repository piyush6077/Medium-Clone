import e from "express"
import { createPost, deletePost, getAllPosts, updatePost } from "../controller/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = e.Router()

router.post("/createPost" ,verifyJWT, createPost)
router.get("/getAllPost", verifyJWT , getAllPosts)
router.put("/updatePost", verifyJWT , updatePost)
router.delete("/delete" , verifyJWT , deletePost)

export default router;
