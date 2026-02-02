import { Signup, Login, Logout } from '../controllers/authController.js'
// import { userVerification } from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post("/logout", Logout);

export default router;