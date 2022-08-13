import express from 'express'
import { getMe, getUser, getUsers, updateUser } from '../controllers/UserController.js'
import { verifyAdmin, verifyToken, verifyuser } from '../middleware/verifyToken.js'

const route = express.Router()


route.get('/' , verifyToken  , getMe   )
route.get('/allusers' , verifyAdmin , getUsers )
route.get('/:id' ,verifyToken , getUser )
route.put('/:id' , verifyuser  ,updateUser )


export default route