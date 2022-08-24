import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import connnectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import cloudinary from 'cloudinary'
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
import cookieParser from "cookie-parser";
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(cookieParser())

app.post('/api/upload' , async(req, res)=>{
    const imgStr = req.body.imgData 
    const uploadResponse = await cloudinary.uploader.upload(imgStr)
    console.log(uploadResponse);
    res.status(201).json('imgUploaded')
   try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send()
   } catch (error) {
        res.status(400).json(error)
   }
})


app.use('/api/Auth'  , Auth)
app.use('/api/user'  , User)
app.use('/api/prod'  , Product)


app.listen(port , ()=> console.log(`server Running on Port ${port}`) )