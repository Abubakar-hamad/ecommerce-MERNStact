import express from "express";




const route = express.Router()

import {loginUser, registerUser} from '../controllers/AuthController.js'

route.post('/register' , registerUser )
route.post('/login' , loginUser)



export default route