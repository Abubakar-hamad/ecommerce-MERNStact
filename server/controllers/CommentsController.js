import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import CommentModel from "../models/CommentModel.js";
import asyncHandler from "express-async-handler";


export const writeComment = asyncHandler(async(req , res )=>{
    const productId = req.params.id
    
    const text = req.body.text
    const userId  = req.user.id
    console.log(text ,productId  , userId);
    const user = await UserModel.findById(userId)
    // const {  password , isAdmin , ...other } = user._doc
    if( !text || !userId || !productId ){
        res.status(400)
        throw new Error("Can't Add Empty Comment")
    }
  
    const newcomment = new CommentModel({
        productId:req.params.id, 
        userIdComment:user._id,
        userEmail:user.email,
        userName:user.name , 
        userImg:user.img ,
        text:text
    }) 

    await  newcomment.save()
    await ProductModel.findByIdAndUpdate(productId , {$push:{comments:newcomment._id}})
    // await UserModel.findByIdAndUpdate(userId , {$push:{commentsInProducts:productId}})
    res.status(201).json({newcomment})

})


export const getComments = asyncHandler(async(req  , res)=>{
    const product = await ProductModel.findById(req.params.id)
    const commments = await Promise.all(product.comments.map((comment)=>{
        return CommentModel.findById(comment)
    }))
    
    res.status(200).json(commments)
    
})