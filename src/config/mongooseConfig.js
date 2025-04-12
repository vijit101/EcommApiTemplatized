import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;

export const ConnectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url);
        console.log("mongo db configured with mongoose ");
    }catch(err){
        console.log(err);
    }
}