import express from 'express'
import todoRoutes from './routes/todoRoutes.js'
import { connectDB } from './config/db.js'
// import rateLimiter from './middleware/rateLimiter.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserAuth from './routes/authRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002;

connectDB()

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())

// app.use(rateLimiter)

app.use('/', UserAuth)

// app.get("/", (req, res) => {
//     res.send("API is running 🚀");
// });

app.use('/api/todos', todoRoutes)

// connectDB().then(() => {
//     app.listen(PORT, () => { console.log(`Server started on port : `, PORT) })
// })

export default app;