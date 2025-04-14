import { Schema } from "mongoose";


export const reviewSchema = new Schema({
    productId: {
        type : ObjectId,
        ref:"products"
    },
    userId:{
        type:ObjectId,
        ref:"users"
    },
    rating:Number,
    
})
