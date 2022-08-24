import express from 'express'
import { countByCat, filterProducts , countByCategory, createProd, deleteProd, getAllProducts, getDetails, myProd, updateProd, cart, Addcart } from '../controllers/ProductController.js'
import {verifyToken, verifyuser} from '../middleware/verifyToken.js'

const route = express.Router()


route.get('/Myproduct' , verifyToken , myProd)
route.get('/' , getAllProducts) 
route.get('/cart' , verifyToken , cart)
route.get('/filter' , filterProducts)
route.get('/category' , countByCat)
route.get('/countByCategory' , countByCategory)
route.post('/create'  , verifyToken , createProd )
route.get('/:id' , verifyToken , getDetails)
route.put('/:id' , verifyuser , updateProd)
route.delete('/:id' , verifyToken , deleteProd)
route.post('/cart/:id' , verifyToken , Addcart)

export default route