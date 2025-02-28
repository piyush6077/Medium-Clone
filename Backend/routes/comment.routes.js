import e from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { createComment, deleteComment, getAllComments } from "../controller/comment.controller.js"
const router = e.Router()

router.post("/:id/comment", verifyJWT, createComment)
router.delete("/:commentId", verifyJWT , deleteComment)
router.get("/:id/comments" , verifyJWT , getAllComments)


export default router