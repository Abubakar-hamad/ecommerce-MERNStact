import express from "express";




const route = express.Router()

import {loginUser, logout, registerUser} from '../controllers/AuthController.js'

route.post('/register' , registerUser )
route.post('/login' , loginUser)
route.get('/logout' , logout)



export default route