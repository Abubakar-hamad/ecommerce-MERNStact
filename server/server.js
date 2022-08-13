import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import connnectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
dotenv.config()
connnectDB()
const port = process.env.PORT || 5000
const app = express()
import Auth from './routes/AuthRoute.js'
import User from './routes/userRoute.js'
import Product from './routes/prodRoute.js'
import cookieParser from "cookie-parser";
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(cookieParser())
app.get('/' , (req, res)=>{
    res.status(200)
    res.send("hello")
})


app.use('/api/Auth'  , Auth)
app.use('/api/user'  , User)
app.use('/api/prod'  , Product)


app.listen(port , ()=> console.log(`server Running on Port ${port}`) )