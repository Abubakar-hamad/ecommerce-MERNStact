import UserModel from "../models/UserModel.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerUser = asyncHandler(async(req,res)=>{
    const {name , email , password} = req.body
    if(!name || !email ||!password)
        return res.status(204).json({message:"some filed empty"})
    
    // check user isAlready 
    const userExsist = await  UserModel.findOne({email})
    if(userExsist)
        return res.status(402).json({message:"user already exist"})
    
    // hashed pass
    const salt = await bcrypt.genSalt(10) 
    const hashedPass = await bcrypt.hash(password  , salt)
    
    
    // create userInDB
    const user  = await UserModel.create({
        ...req.body ,
        password :hashedPass,
    })

    if(user)
        return res.status(201).json({
            _id :user.is ,
            name: user.name ,
            email:user.email  ,
            password: user.password
        })
}) 


export const loginUser  = asyncHandler(async(req  , res)=>{
//    if user Exsist
    const user = await UserModel.findOne({email:req.body.email})
   if(!user){
    res.status(404)
    throw new Error("No user with this Email")
   }

//    if passwors correct

    const isCorrect = await bcrypt.compare(req.body.password , user.password)
    if(!isCorrect ){
        res.status(400)
        throw new Error ("Wrong passoword")
    }


    const token  = jwt.sign(
        {id:user._id , isAdmin:user.isAdmin , name:user.name} , process.env.JWT_SECRET
    )
    const {password , isAdmin ,...otherDetails} = user._doc
    res.cookie("access_token" , token  , {httpOnly:true}).status(200).json(otherDetails)
})


export const logout = asyncHandler(async(req  , res)=>{
    res.clearCookie("access_token").status(200).json('cookies removed')
    res.end()
})