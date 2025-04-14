import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";


const productSchemaModel = mongoose.model("products",productSchema);
const reviewSchemaModel = mongoose.model("reviews",reviewSchema);


class ProductRepository {
  async Add(productData) {
    try {
      const db = getDB();
      const ProductCollection = db.collection("products");
      // users.push(newUser);
      await ProductCollection.insertOne(productData);
      return productData;
    } catch (err) {
      console.log("prod controller Add:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const ProductCollection = db.collection("products");
      return await ProductCollection.find({}).toArray();
    } catch (err) {
      console.log("prod controller getAll:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const ProductCollection = db.collection("products");
      return await ProductCollection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log("prod controller get:id" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  // min price and category
  async filter(minPrice, category,namePriceRatingView) {// earlier function i made async filter(minPrice, maxPrice, category)
    try {
      const db = getDB();
      const ProductCollection = db.collection("products");
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) }; // min price was overriding max price
      }
      // if (maxPrice) {
      //   filterExpression.price = {
      //     ...filterExpression,
      //     $lte: parseFloat(maxPrice),
      //   }; // combine filter for min price
      // }
      if (category) {
        filterExpression = {$and:[{category:category},filterExpression]};
        // earlier filterExpression.category = category;
      }
      if(!namePriceRatingView){
        return await ProductCollection.find(filterExpression).toArray();
      }else{
        return await ProductCollection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray();
        // not show id and show only 1st rating
      }

      
    } catch (err) {
      console.log("prod controller filter" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async avgPricePerCategory(){
    try{
      const db= getDB();
      const ProductCollection = await db.collection("products");
      const aggregatedRes = await ProductCollection.aggregate([{
        // get avg pricer per category
        $group :{
          _id:"$category", // this says group all based on id/field called category
          averagePrice:{$avg:"$price"}
        }
      }]).toArray();
      return aggregatedRes;
    }catch(err){
      console.log("prod controller filter" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  

  // async rate(userId, productId, rating) {
  //   try {
  //     const db = getDB();
  //     const ProductCollection = db.collection("products");
  //     // find prod 
  //     const prod = await ProductCollection.findOne({_id:new ObjectId(productId)});
  //     const userRating = prod?.ratings?.find(r=>r.userId == userId);
  //     if(userRating){
  //       await ProductCollection.updateOne(
  //         {_id : new ObjectId(productId),"ratings.userId":new ObjectId(userId)},
  //         {
  //           $set:{
  //            "ratings.$.rating": rating  // ratings is array and $ is placeholder for the found out object
  //         }}
  //       )
  //     }else{
  //       await ProductCollection.updateOne(
  //         { _id: new ObjectId(productId) },
  //         {
  //           $push: { ratings: { userId :new ObjectId(userId), rating } }
  //         }
  //       );
  //     }
      
  //   } catch (err) {
  //     console.log("prod controller filter" + err);
  //     throw new ApplicationError("Something went wrong", 500);
  //   }
  // }

  // using mongo db directly 
  // async rate(userId, productId, rating) {
  //   try {
  //     const db = getDB();
  //     const ProductCollection = db.collection("products");
  //     // we will pop/pull in db  the element
      
  //     await ProductCollection.updateOne({
  //       _id: new ObjectId(productId)
  //     },
  //   {
  //     $pull:{
  //       ratings:{userId:new ObjectId(userId)}
  //     }
  //   });
      

  //     await ProductCollection.updateOne(
  //       { _id: new ObjectId(productId) },
  //       {
  //         $push: { ratings: { userId :new ObjectId(userId), rating } }
  //       }
  //     );
        
      
      
  //   } catch (err) {
  //     console.log("prod controller filter" + err);
  //     throw new ApplicationError("Something went wrong", 500);
  //   }
  // }

  // using mongoose 
  async rate(userId, productId, rating) {
    try{
      // if prod exists 
      const productToUpdate = await productSchemaModel.findById(productId);
      if(!productToUpdate){
        throw new Error("product not found");
      }
      const userReview = await reviewSchemaModel.findOne({
        productId: new ObjectId(productId)
      })
      if(userReview){
        userReview.rating = rating;
        await userReview.save();
      }else{
        const newReview = new reviewSchemaModel({
          productId: new ObjectId(productId), 
          userId: new ObjectId(userId),
          rating:rating 
        })
        newReview.save();
      }

    }catch(err){
      console.log("prod controller filter" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }



}

export default ProductRepository;
