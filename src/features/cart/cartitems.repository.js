import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import CartItemModel from "./cartitems.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemsRepository {
  async addToCart(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection("cartItems");
      // remove the below lines 12-13 to revert it to mongo db id's
      const id = await this.getNextCounter(db);
      if (id == null) throw new Error("ID generation failed!");
      let cartItem = new CartItemModel(
        new ObjectId(productId),
        new ObjectId(userId),
        quantity
      );
      await collection.updateOne(
        { userId: cartItem.userId, productId: cartItem.productId },
        { // remove the next line to revert it to mongo db id's 
          $setOnInsert:{_id:id},
          $inc: { quantity: quantity } },
        { upsert: true }
      ); // this searches if found up[date quantity if not crate new
      return cartItem;
    } catch (err) {
      console.log("cart items Addto cart:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getCartbyUserId(userId) {
    try {
      const db = getDB();
      const collection = db.collection("cartItems");
      let cartItem = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();
      return cartItem;
    } catch (err) {
      console.log("cart items Addto cart:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async delete(cartItemId, userId) {
    try {
      const db = getDB();
      const collection = db.collection("cartItems");
      let result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });
      return result;
    } catch (err) {
      console.log("cart items Addto cart:" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getNextCounter(db) {
    const resultDocument = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    console.log(resultDocument);
    return resultDocument.value;
    // result document format is like
    // {
    //   lastErrorObject: { ... },
    //   value: { _id: "cartItemId", value: 5 }, // ← Updated document
    //   ok: 1
    // }
    // hence value.value
  }
}
