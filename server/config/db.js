import mongoose from "mongoose";
import  colors  from "colors";
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected :${conn.connection.host}`.cyan);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB ;