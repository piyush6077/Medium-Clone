import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json())

//routes 
app.use('/api/v1/user', userRoutes)


app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server is running :::: ${PORT}`)  
})