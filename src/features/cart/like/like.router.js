import express from "express";
import { likeControllerclass } from "./like.controller";

const likeRouter = express.Router();
const likeControllerObj = new likeControllerclass();

likeRouter.post("/",(req,res)=>{
    likeControllerObj.LikeItemfx(req,res);
})

export default likeRouter;