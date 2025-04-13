import { Schema } from "mongoose";
const typeEnum = ["Customer", "Seller"];

var passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\../, "Please enter a valid email"],
  },
  password: {
    type: String,
    validate: {
      validator: function (vals) {
        return passwordregex.test(vals);
      },
      message: "password should be btw 6 = 16 chars ",
    },
  },
  type: { type: String, enum: typeEnum },
});
