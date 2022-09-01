import express from "express";
const route = express.Router()

import { writeComment , getComments } from "../controllers/CommentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";



route.post('/:id' , verifyToken , writeComment)
route.get('/:id' , verifyToken , getComments)

export default route