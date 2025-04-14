import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export const reviewSchema = new Schema({
    productId: {
        type : ObjectId,
        ref:"products"
    },
    userId:{
        type: ObjectId,
        ref:"users"
    },
    rating:Number,
    
})
