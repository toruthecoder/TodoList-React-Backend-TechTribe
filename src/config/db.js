import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('DB connected')
    } catch (error) {
        console.error(`Error Connecting DB`, error)
        process.exit(1)
    }
}