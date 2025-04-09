import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collections = "orders";
  }
  async placeOrder(userId) {
    try {
      const db = getDB();
      let items = await this.getTotalAmount(userId);
      const calTotalOrderAmt = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      const newOrder = new OrderModel(new ObjectId(userId),calTotalOrderAmt,new Date());
      await db.collection(this.collections).insertOne(newOrder);
      // stock update as ordered 
      for(let item of items){
        await db.collection("products").updateOne({
          _id : item.productId
        },{$inc:{stock: -item.quantity}}); 
      }
      // delete cart items as now its an orderitem
      await db.collection("cartItems").deleteMany({
        userId: new ObjectId(userId),
      });
      return newOrder;
    } catch (err) {
      console.log("Error placing order:", err);
    }
  }

  async getTotalAmount(userId) {
    const db = getDB();

    const items = await db
      .collection("cartItems")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        // get the products via products collection using product id in cart
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        //3 unwinding product info
        {
          $unwind: "$productInfo",
        },
        //4. cal total amount for each cart item
        {
          $addFields: {
            totalAmount: {
              $multiply: ["$productInfo.price", "$quantity"],
            },
          },
        },
      ])
      .toArray();
    return items;
  }
}
