import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export const productSchema = new Schema({
    name : String , 
    desc : String , 
    imageUrl : String,
    category : String,
    prices : Number,
    sizes : Array,
    stock : Number,
    reviewsIdArray:[
        {
            type : ObjectId,
            ref:"reviews"
        }
    ],
    categoriesIdArray:[
        {
            type : ObjectId,
            ref : "categories"
        }
    ]
})