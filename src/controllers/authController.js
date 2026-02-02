import User from '../model/user.js'
import createSecretToken from '../config/secretToken.js'
import bcrypt from 'bcryptjs'

export const Signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exist" })
        }
        const user = await User.create({ email, username, password });
        const token = createSecretToken(user._id)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })
        res.status(201).json({
            message: "User SignUp Successfully.", success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(404).json({ message: 'All Fields are Required.' })
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'Incorect Password or Email 0' })
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) return res.status(404).json({ message: 'Incorect Password or Email 1' })
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })
        res.status(201).json({
            message: "User Logged In Successfully.", success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const Logout = async (_, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        res.status(200).json({
            message: "User Logged Out Successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Logout failed" });
    }
};