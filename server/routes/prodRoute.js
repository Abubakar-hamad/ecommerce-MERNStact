import express from 'express'
import { productCount , countByCat, filterProducts , createProd, deleteProd, getAllProducts, getDetails, myProd, updateProd } from '../controllers/ProductController.js'
import {verifyAdmin, verifyToken, verifyuser} from '../middleware/verifyToken.js'

const route = express.Router()
productCount

route.get('/Myproduct' , verifyToken , myProd)
route.get('/' , getAllProducts) 
route.get('/filter' , filterProducts)
route.get('/category' , countByCat)
route.get('/ppp' , verifyAdmin , productCount)
route.post('/create'  , verifyAdmin , createProd )
route.get('/:id' , verifyToken , getDetails)
route.put('/:id' , verifyAdmin , updateProd)
route.delete('/:id' , verifyAdmin , deleteProd)


export default route