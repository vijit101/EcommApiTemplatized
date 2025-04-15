import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";
dotenv.config();

const url = process.env.DB_URL;

export const ConnectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url);
        console.log("mongo db configured with mongoose ");
        await CreateCategories();
    }catch(err){
        console.log(err);
    }
}

async function  CreateCategories() {
    const categorySchemaModel = mongoose.model("Category",categorySchema);
    const categories = await categorySchemaModel.find();
    if(!categories || categories.length == 0){
        await categorySchemaModel.insertMany([
            {name:"Books"},
            {name:"Clothing"},
            {name:"Electronics"}
        ])
    }
    console.log("All prod categories initialized");
}