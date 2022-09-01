import mongoose from "mongoose";

const commentScheema = mongoose.Schema({
    productId:{
        type:String
    }, 
    userIdComment :{
        type:String , 
    },
    userImg:{
        type:String
    }, 
    userName:{
        type:String
    },
    userEmail:{
        type:String
    },
    text:{
        type:String
    }

} ,
{timestamps:true}
)

const CommentModel = mongoose.model('comments' , commentScheema)

export default CommentModel