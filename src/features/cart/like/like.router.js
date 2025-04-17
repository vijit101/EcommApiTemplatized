import express from "express";
import { likeControllerclass } from "./like.controller.js";

const likeRouter = express.Router();
const likeControllerObj = new likeControllerclass();

likeRouter.post("/",(req,res)=>{
    likeControllerObj.LikeItemfx(req,res);
})

likeRouter.get("/",(req,res)=>{
    likeControllerObj.GetLikesfx(req,res);
})

export default likeRouter;