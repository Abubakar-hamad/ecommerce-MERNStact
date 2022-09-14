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
    const { prCategory , min , max  , ...others }= req.query;
    const products = await ProductModel.find({
        ...others ,
        prCategory , 
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
        res.status(404).json("No Products Added ..")
    }
    res.status(200).json(items)
})



export const countByCat = asyncHandler(async(req,res)=>{
    const electrCount = await ProductModel.countDocuments({prCategory:"electronic"})
    const fashionCount = await ProductModel.countDocuments({prCategory:"fashion"})
    const toysCount = await ProductModel.countDocuments({prCategory:"toys"})
    const allProd = await ProductModel.countDocuments()
    return res.status(200).json([
        {prCategory:"electronic" , count:electrCount},
        {prCategory:"fashion" , count:fashionCount},
        {prCategory:"toys" , count:toysCount},
        {prCategory:"all_items" , count:allProd}
    ])
})

export const productCount = asyncHandler(async(req , res)=>{
    const prCount = await ProductModel.countDocuments({})
    if(!prCount || prCount == '' || prCount == undefined) return res.status(200).json('No Users In DB')

    return res.status(200).json({'count':prCount})
})




