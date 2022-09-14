import express from "express";
const route = express.Router()

import { writeComment , getComments , commentCount  , getAllComment} from "../controllers/CommentsController.js";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken.js";



route.get('/ccc' , verifyAdmin , commentCount)
route.get('/' , getAllComment)
route.post('/:id' , verifyToken , writeComment)
route.get('/:id' , verifyToken , getComments)

export default route