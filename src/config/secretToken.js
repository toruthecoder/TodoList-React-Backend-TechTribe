import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: 40 * 24 * 60 * 60, });
}

export default createSecretToken