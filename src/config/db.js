import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017');
        console.log('DB connected')
    } catch (error) {
        console.error(`Error Connecting DB`, error)
        process.exit(1)
    }
}