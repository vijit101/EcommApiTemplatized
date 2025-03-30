import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

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

  async getAll(){
    try{
      const db = getDB();
      const ProductCollection = db.collection("products");
      return await ProductCollection.find({}).toArray();
    }catch (err) {
      console.log("prod controller getAll:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
    
  }

  async get(id){
    try{
      const db = getDB();
      const ProductCollection = db.collection("products");
      return await ProductCollection.findOne({_id: new ObjectId(id)});
    }catch (err) {
      console.log("prod controller get:id" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async filter(minPrice,maxPrice,category){
    try{
      const db = getDB();
      const ProductCollection = db.collection("products");
      let filterExpression = { };
      if(minPrice){
        filterExpression.price = {$gte: parseFloat(minPrice)}; 
      }
      if(maxPrice){
        filterExpression.price = {$lte: parseFloat(maxPrice)}; 
      }
      if(category){
        filterExpression.category = category;
      }
      return await ProductCollection.find(filterExpression).toArray();
    }catch (err) {
      console.log("prod controller filter" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

}

export default ProductRepository;
