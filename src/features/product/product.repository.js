import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ProductRepository {
  async Add(productData) {
    try {
      const db = getDB();
      const userCollection = db.collection("products");
      // users.push(newUser);
      await userCollection.insertOne(productData);
      return productData;
    } catch (err) {
      console.log("prod controller Add:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getAll(){
    try{
      const db = getDB();
      const userCollection = db.collection("products");
      return await userCollection.find({}).toArray();
    }catch (err) {
      console.log("prod controller getAll:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
    
  }

  async get(id){
    try{
      const db = getDB();
      const userCollection = db.collection("products");
      return await userCollection.findOne({_id: new ObjectId(id)});
    }catch (err) {
      console.log("prod controller getAll:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;
