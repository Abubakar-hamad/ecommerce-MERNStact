import mongoose from "mongoose";

const productScheema = mongoose.Schema({
    userId: { 
        type: String,
        require: true
     },
    prName:{
        type:String ,
        required:true
    } ,
    prPrice:{
        type:Number ,
        required:true
    } ,
    prDesc:{
        type:String ,
        required:true
    } ,
    prAddress:{
        type:String ,
    } ,
    prCategory:{
        type:String ,
        required:true  
    },
    prQuant:{
        type:Number ,
        default:1
    } ,
    prImg:{
        type:[String]
    } ,
    comments:{
        type:[String]
    }
} ,
    {
        timestamps:true
    }
);

const ProductModel = mongoose.model("Products" , productScheema)
export default ProductModel