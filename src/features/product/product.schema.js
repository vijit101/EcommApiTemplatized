import { Schema } from "mongoose";

export const productSchema = new Schema({
    name : String , 
    desc : String , 
    imageUrl : String,
    category : String,
    prices : Number,
    sizes : Array,
    stock : Number,
})