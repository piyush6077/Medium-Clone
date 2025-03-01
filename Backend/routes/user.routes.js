import e from "express"
import { checkAuth, handleLogin, handleLogout, handleSignUp, updateUserProfile } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js"
const router = e.Router()

router.post('/register', handleSignUp)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)
router.post('/updateProfile', verifyJWT, upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]), updateUserProfile)

router.get("/checkAuth",verifyJWT, checkAuth)


export default router