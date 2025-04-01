import express from "express";
import { CartItemController } from "./cartitems.controller.js";

const CartItemRouter = express.Router();
const cartItemController = new CartItemController();

CartItemRouter.delete('/:id',(req,res)=>{
    cartItemController.DeleteItem(req,res);
});
CartItemRouter.post("/addtocart",(req,res)=>{
    cartItemController.addToCart(req,res);
});
CartItemRouter.get("/getCart",(req,res)=>{
    cartItemController.getUserCart(req,res);
});


export default CartItemRouter;