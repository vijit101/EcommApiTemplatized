import { Schema } from "mongoose";

export const cartschema = new Schema({
  productId: { type: ObjectId, ref: "products" }, // add DB name
  userId: { type: ObjectId, ref: "users" },
  quantity: Number,
});
