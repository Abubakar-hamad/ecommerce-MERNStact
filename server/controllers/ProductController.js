import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import asyncHandler from "express-async-handler";


export const createProd = asyncHandler(async(req , res)=>{
    const { prName ,prPrice ,prDesc  ,prAddress , prQuant , prImg ,prCategory  , userId} = req.body
    if(!prName || !prPrice || !prDesc || !prCategory ){
        res.status(400)
        throw new Error ('require Filed')   
    }
   
    const product  = new ProductModel({
        userId:req.user.id ,
        ...req.body
    })
    await product.save();
    console.log(product.id);
    await UserModel.findByIdAndUpdate(req.user.id , {$push:{userProd:product.id}})
    console.log(req.user);
    res.status(201).json({"Product Publish" : product})
}) 

export const updateProd = asyncHandler(async(req , res)=>{
    const prID= req.params.id
    const product = await ProductModel.findByIdAndUpdate(prID , {$set:req.body} , {new:true})
    if(!product){
        res.status(404)
        throw new Error("product Not found")
    }
    
    res.status(200).json({"updated successfully":product})
})


export const deleteProd = asyncHandler(async(req , res)=>{
    const product = await ProductModel.findByIdAndRemove(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("product Not found")
    } 
    await UserModel.findByIdAndUpdate(req.user.id , {$pull:{userProd:req.params.id}})
    await UserModel.findByIdAndUpdate(req.user.id , {$pull:{userCart:req.params.id}})
    res.status(200).json({"Deleted successfully":product})
})

export const getDetails = asyncHandler(async(req ,res)=>{
    const product = await ProductModel.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("product Not found")
    }

    res.status(200).json({product})
})

export const getAllProducts = asyncHandler(async(req  ,res)=>{
    
    const products = await ProductModel.find()
    if(!products){
        res.status(200)
        throw new Error("no product yet .. .")
    }

    res.status(200).json({products})
})

export const filterProducts = asyncHandler(async(req,res)=>{
    const { min , max  , ...others }= req.query;
    const products = await ProductModel.find({
        ...others ,
        prPrice:{$gt:min || 1 , $lt:max || 100000} , 
    }).limit(req.query.limit);
    if(!products){
        res.status(200)
        throw new Error("no product with this filter")
    }

    res.status(200).json({products})
})

export const myProd = asyncHandler(async(req , res)=>{
    const user = await UserModel.findById(req.user.id)
    const items = await Promise.all(user.userProd.map((item)=>{
        return ProductModel.findById(item)
    }))
    if(!items || items == '' || items == null){
        res.status(404).json("no product for this user")
    }
    res.status(200).json(items)
})

export const Addcart = asyncHandler(async(req , res)=>{
    const user = await UserModel.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('you most to login first')
    }
    const product = await ProductModel.findById(req.params.id)
    
    const isExist = await ProductModel.findById(user.userCart , product.id)
    if(isExist){
       return res.status(400).json('item already added')
    }
    await UserModel.findByIdAndUpdate(req.user.id , {$push:{userCart:product.id}})
    res.status(200).json('Added to Cart')
})

export const cart = asyncHandler(async(req   ,res)=>{
    const user = await UserModel.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error ("you most login first")
    }
    const items = await Promise.all(user.userCart.map(item =>{
        return ProductModel.findById(item)
    }))

    res.status(200).json(items)
})

export const countByCat = asyncHandler(async(req,res)=>{
    const electrCount = await ProductModel.countDocuments({prCategory:"electronic"})
    const fashionCount = await ProductModel.countDocuments({prCategory:"fashion"})
    const toysCount = await ProductModel.countDocuments({prCategory:"toys"})
    return res.status(200).json([
        {prCategory:"electronic" , count:electrCount},
        {prCategory:"fashion" , count:fashionCount},
        {prCategory:"toys" , count:toysCount}
    ])
})

export const countByCategory = asyncHandler(async(req , res)=>{
    const categories = req.query.categories.split(',')
    const list = await Promise.all(categories.map(cat =>{
        return ProductModel.countDocuments({cat})
    }))
    return res.status(200).json(list)
})

