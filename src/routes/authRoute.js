import { Signup, Login } from '../controllers/authController.js'
import { userVerification } from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post("/verify", userVerification, (req, res) => {
    res.json({
        status: true,
        user: req.user.username,
        email: req.user.email,
        // httpOnly: true,
        // secure: true,
        // sameSite: "None",
    });
    // res.json({ success: true })
});

export default router;