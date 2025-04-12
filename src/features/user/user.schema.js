import { Schema } from "mongoose";
const typeEnum = ["Customer", "Seller"];

export const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: typeEnum },
});
