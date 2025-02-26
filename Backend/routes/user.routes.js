import e from "express"
import { getUserProfile, handleLogin, handleLogout, handleSignUp, updateUserProfile } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = e.Router()

router.post('/register', handleSignUp)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)
router.post('/updateProfile', updateUserProfile)


router.get("/profile",verifyJWT, getUserProfile)



export default router