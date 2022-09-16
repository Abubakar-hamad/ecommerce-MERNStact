import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import connnectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import asyncHandler from "express-async-handler";
import cloudinary from 'cloudinary'
import multer from 'multer'
dotenv.config()
connnectDB()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.CLOUD_API_SECRET ,
    api_secret: process.env.CLOUD_API_SECRET ,
})
const port = process.env.PORT || 5000
const app = express()
import Auth from './routes/AuthRoute.js'
import User from './routes/userRoute.js'
import Product from './routes/prodRoute.js'
import Comm from "./routes/commentRoute.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(cookieParser())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('public'))
// multer config
const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null , './public')
    } ,
    filename:(req, file ,cb)=>{
        const fName  = `${Date.now()}_${file.originalname}`
        cb(null  , fName)
    }
})
const upload = multer({storage:storage}).single('prImg')

app.post('/api/uploads' , upload , (req , res)=>{
    const {file} = req;
    res.send({ 
        file:file.originalname,
        path:file.path ,
        })
}) 

app.use('/api/Auth'  , Auth)
app.use('/api/user'  , User)
app.use('/api/prod'  , Product)
app.use('/api/comment' , Comm )



app.listen(port , ()=> console.log(`server Running on Port ${port}`) )