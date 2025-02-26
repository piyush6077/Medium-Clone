import e from "express"
import { handleLogin, handleLogout, handleSignUp } from "../controller/user.controller.js"
const router = e.Router()

router.post('/register', handleSignUp)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)

export default router