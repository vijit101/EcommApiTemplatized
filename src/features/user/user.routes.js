import express from "express";
import { UserController } from "./user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

// userRouter.post("/signup",userController.signUp); // old routes before user repository
// userRouter.post("/signin",userController.signIn);
userRouter.post("/signup",(req,res)=>{
    userController.signUp(req,res); // problem is when signup is passed old method it just saves fx of signup and forgets about usercontroller 
}); 
userRouter.post("/signin",(req,res)=>{
    userController.signIn(req,res); // problem is when signup is passed old method it just saves fx of signup and forgets about usercontroller 
}); 
export default userRouter;