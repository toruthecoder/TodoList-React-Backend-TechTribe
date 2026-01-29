import User from '../model/user.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const userVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false });
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: false });
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ status: false });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ status: false });
    }
};