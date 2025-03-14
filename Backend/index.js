import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoute from "./routes/comment.routes.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public")) //here we can store assets on the server that can be accessed by all

//routes 
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/comments', commentRoute)


app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is running :::: ${PORT}`)  
})