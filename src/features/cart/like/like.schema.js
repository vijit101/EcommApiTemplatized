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
}).pre("save",(next)=>{
    // pre middleware 
    console.log("New like coming in");
    next();// loads other pre mongoose middleware if any
}).post('save',(doc)=>{
    console.log("saved \n"+doc);
}).pre("find",(next)=>{
    console.log("getting likes");
    next();
}).post("find",(docs)=>{
    console.log("Find Completed "+docs);
    
})