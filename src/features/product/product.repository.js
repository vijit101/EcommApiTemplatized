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
}

export default ProductRepository;
