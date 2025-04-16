import mongoose, { model } from "mongoose";
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
            await newLikeObj.save();
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
            await newLikeObj.save();
        }catch(err){
            console.log(err);
        }
    }

    async getLikesfx(id,collectionTypes){
        try{

            return await likeSchemaModel.find({
                likeId: new ObjectId(id),
                collectionTypes : collectionTypes,
            }).populate('userId').populate({path:"likeId",model:collectionTypes})

        }catch(err){
            console.log(err);
        }
    }
}