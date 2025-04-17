import { Schema } from "mongoose";
import { ObjectId } from "mongodb";
export const likeSchema = new Schema({
    userId:{
        type: ObjectId,
        ref:'users'
    },
    // id of the product or category that is liked
    likeId:{
        type : ObjectId,
        refPath : "collectionTypes"
    },
    // did a person like a specific product or a product category ?
    collectionTypes:{
        type : String,
        enum:['products','categories']
        
    }
})