import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
const likeSchemaModel = mongoose.model("likes",likeSchema);

export class LikeRepositoryClass{
    async likeProductfx(userId,productId){
        try{
            const newLikeObj = new likeSchemaModel({
                userId: new ObjectId(userId),
                likeId : new ObjectId(productId),
                collectionTypes :'products'

            })
        }catch(err){
            console.log(err);
        }
    }

    async likeCategoryfx(userId,categoryId){
        try{
            const newLikeObj = new likeSchemaModel({
                userId: new ObjectId(userId),
                likeId : new ObjectId(categoryId),
                collectionTypes :'categories'

            })
        }catch(err){
            console.log(err);
        }
    }
}