import e from "express"
import { verifyJWT } from "../middleware/auth.middleware"
const router = e.Router()

router.post("/:id/comment", verifyJWT, createComment)
router.delete("/comment/:commentId", verifyJWT , deleteComment)
router.get("/:id/comments" , verifyJWT , getAllComment)


export default router