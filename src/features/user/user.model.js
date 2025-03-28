import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static async SignUp(name, email, password, type) {
    // get db
    try {
      const db = getDB();
      const userCollection = db.collection("users");
      const newUser = new UserModel(
        users.length + 1,
        name,
        email,
        password,
        type
      );

      // users.push(newUser);
      await userCollection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log("user model sign up :" + err);
      throw new ApplicationError("Something went wrong", 500);
    }
    
  }

  static SignIn(email, password) {
    let user = null;
    for (let index = 0; index < users.length; index++) {
      if (users[index].password === password && users[index].email === email) {
        user = users[index];
      }
    }
    return user;
  }

  static getAllUser() {
    return users;
  }
}

let users = [
  {
    id: "1",
    name: "vijit",
    email: "shb@x.com",
    password: "pass",
    type: "seller",
  },
];
