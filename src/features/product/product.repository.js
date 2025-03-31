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

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const ProductCollection = db.collection("products");
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) }; // min price was overriding max price
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression,
          $lte: parseFloat(maxPrice),
        }; // combine filter for min price
      }
      if (category) {
        filterExpression.category = category;
      }
      return await ProductCollection.find(filterExpression).toArray();
    } catch (err) {
      console.log("prod controller filter" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async rate(userId, productId, rating) {
    try {
      const db = getDB();
      const ProductCollection = db.collection("products");

      ProductCollection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: { ratings: { userId, rating } }
        }
      );
    } catch (err) {
      console.log("prod controller filter" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;
