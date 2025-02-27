import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cookieParser())

//routes 
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)

app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is running :::: ${PORT}`)  
})