import { Schema, mongoose } from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const userSchemaModel = mongoose.model("users", userSchema); // users colelction/db name

export default class UserRepository {
  async SignUp(user) {
    try {
      const newUser = new userSchemaModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with db URJS", 500);
    }
  }

  async SignIn(email, password) {
    try {
      return userSchemaModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with db URJS", 500);
    }
  }

  async FindByEmail(email) {
    try {
      return await userSchemaModel.findOne({ email: email });
    } catch (err) {
      console.log("user find by email repo :" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }


  async resetPassword(userId,newPassword){
    try{
        let user = await userSchemaModel.findById(userId);
        if(user){
            user.password = newPassword;
            user.save();
        }else{
            throw new error("User not Found");
        }
    }catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
