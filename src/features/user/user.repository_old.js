import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserRepository {
  async SignUp(newUserInstance) {
    // get db
    try {
      const db = getDB();
      const userCollection = db.collection("users");
      // users.push(newUser);
      await userCollection.insertOne(newUserInstance);
      return newUserInstance;
    } catch (err) {
      console.log("user model sign up :" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  // async SignIn(email,password) {
  //     // get db
  //     try {
  //       const db = getDB();
  //       const userCollection = db.collection("users");
  //       // users.push(newUser);
  //       return await userCollection.findOne({email:email,password:password});
  //     } catch (err) {
  //       console.log("user model sign up :" + err);
  //       throw new ApplicationError("Something went wrong", 500);
  //     }

  // }

  async FindByEmail(email) {
    // get db
    try {
      const db = getDB();
      const userCollection = db.collection("users");
      // users.push(newUser);
      return await userCollection.findOne({ email: email });
    } catch (err) {
      console.log("user model sign up :" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
