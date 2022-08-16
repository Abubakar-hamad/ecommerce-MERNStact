import UserModel from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

export const getMe = asyncHandler(async(req  ,res )=>{
        const id = req.user.id
        const user =  await UserModel.findOne({id})
        const { password , isAdmin , ...other} = user._doc
        return res.status(201).json(other)
        
        
        
})


export const updateUser = asyncHandler(async(req  , res)=>{
    const user = await UserModel.findByIdAndUpdate(req.params.id , {$set:req.body} , {new:true})
    if(!user){
        res.status(400)
        throw new Error("something went wrong")
    }
    if(user){
        res.status(200).json({"successufully updated":user})
    }
})


export const deleteUser = asyncHandler(async(req , res)=>{
    const user = await UserModel.findByIdAndRemove(req.params.id)
    res.status(200).json({"deleted user with info":user})
})


export const getUsers =   asyncHandler(async(req , res)=>{
    const users  = await UserModel.find()
    if(!users){
        res.status(404)
        throw new Error("there is no users yet ..")
    }

    res.status(200).json(users)
})

export const getUser = asyncHandler(async(req , res)=>{
    const user = await UserModel.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error ("user not found")
    }
    res.status(200).json(user)
})