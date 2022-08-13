import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :{
        type:String ,
        required:true
    } ,
    email :{
        type:String ,
        required:true
    } ,
    password:{
        type:String ,
        required:true
    } ,
    isAdmin:{
        type:Boolean , 
        default:false
    } ,
    Address:{
        type:String , 
    } ,
    img:{
		type: String,
		data:Buffer,
	} , 
    userProd:{
        type:[String]
    }
    
} ,
{
    timestamps:true
}
)

const UserModel = mongoose.model("Users" , userSchema)
export default UserModel ;