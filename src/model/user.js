import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your Email is Required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Your Password is Required'],
    },
    password: {
        type: String,
        required: [true, 'Your Password is Required'],
    },
}, { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
})

const UserAuth = mongoose.model('User', userSchema)
export default UserAuth