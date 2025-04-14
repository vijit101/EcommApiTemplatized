import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export const categorySchema = new Schema({
    name: String,
    productIdArray:[
        {
            type: ObjectId,
            ref: "products",
        }
    ]
})