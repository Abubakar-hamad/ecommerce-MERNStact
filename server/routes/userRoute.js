import express from 'express'
import { getMe, getUser, getUsers, updateUser , userCount , deleteUser } from '../controllers/UserController.js'
import { verifyAdmin, verifyToken, verifyuser } from '../middleware/verifyToken.js'

const route = express.Router()


route.get('/' , verifyAdmin , getUsers )
route.get('/uuu' , verifyAdmin , userCount   )
route.get('/me' , verifyToken  , getMe   )
route.get('/:id' ,verifyToken , getUser )
route.put('/:id' , verifyuser  ,updateUser )
route.delete('/:id' , verifyToken , deleteUser)


export default route