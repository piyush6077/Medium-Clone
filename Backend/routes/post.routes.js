import e from "express"
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controller/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = e.Router()

router.post("/createPost" ,verifyJWT, createPost)
router.get("/getAllPost", verifyJWT , getAllPosts)
router.get("/:id", verifyJWT, getPostById)
router.put("/:id", verifyJWT , updatePost)
router.delete("/:id" , verifyJWT , deletePost)

export default router;
