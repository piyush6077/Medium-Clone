import e from "express"
import { handleSignUp } from "../controller/user.controller"
const router = e.Router()

router.post('/register', handleSignUp)

export default router