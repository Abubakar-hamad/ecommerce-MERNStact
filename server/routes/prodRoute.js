import express from 'express'
import { countByCat, filterProducts , countByCategory, createProd, deleteProd, getAllProducts, getDetails, myProd, updateProd } from '../controllers/ProductController.js'
import {verifyToken, verifyuser} from '../middleware/verifyToken.js'

const route = express.Router()


route.get('/Myproduct' , verifyToken , myProd)
route.get('/' , getAllProducts) 
route.get('/filter' , filterProducts)
route.get('/category' , countByCat)
route.get('/countByCategory' , countByCategory)
route.post('/create'  , verifyToken , createProd )
route.get('/:id' , verifyToken , getDetails)
route.put('/:id' , verifyuser , updateProd)
route.delete('/:id' , verifyuser , deleteProd)

export default route