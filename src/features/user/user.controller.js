import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
// import UserRepository from "./user.repository_old.js";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import { logger } from "../../middlewares/logger.middleware.js";
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12); // 12 is salt
    let newuData = new UserModel(name, email, hashedPassword, type);
    await this.userRepository.SignUp(newuData);
    res.status(201).send(newuData);
  }

  async signIn(req, res, next) {
    try {
      let user = await this.userRepository.FindByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Email id");
      } else {
        // check if password for user right
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_Secret,
            { expiresIn: "2h" }
          );
          return res.status(200).send(token);
        } else {
          console.log(err);
          return res.status(400).send("Somthing went wrong");
        }
      }
    } catch (err) {
      console.log(err);
      logger();
      return res.status(400).send("Somthing went wrong");
    }
  }

  async resetPassword(req,res){
    const{password} = req.body;
    const userId = req.userId;
    const hashedpass = await bcrypt.hash(password,12);
    try{
      await this.userRepository.resetPassword(userId,hashedpass);
      return res.status(200).send("Password Reset");
    }catch(err){
      return res.status(400).send("Somthing went wrong");
    }
  }
}
