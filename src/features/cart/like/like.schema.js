import { Schema } from "mongoose";

export const likeSchema = new Schema({
    userId:{
        type:ObjectId,
        ref:'users'
    },
    likeId:{
        type : ObjectId,
        refPath : "collectionTypes"
    },
    collectionTypes:{
        type : String,
        enum:['products','categories']
    }
})