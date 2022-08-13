import jwt  from "jsonwebtoken";


export const verifyToken = (req , res  , next)=>{
    const token  = req.cookies.access_token ;
    if(!token){
        res.status(403)
        throw new Error("there is no Token ,,, you are not authenticated")
    }
    jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
        if(err){
            res.status(403)
            throw new Error(err)
        }
        req.user = user ;
        next();
    });
}

export const verifyuser = (req , res, next)=>{
    verifyToken(req , res , ()=>{
        console.log(req.user.id , "isAdmin ?");
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(401)
            throw new Error("you are not authenticated")
        }
    })
} 

export const verifyAdmin = (req  , res , next)=>{
    verifyToken(req  , res , ()=>{
        console.log(`ID:${req.user.id} , IsAdmin:${req.user.isAdmin}`);
        if(req.user.isAdmin){
            next()
        }else{
            res.status(401)
            throw new Error("admin Only can access")
        }
    })
}