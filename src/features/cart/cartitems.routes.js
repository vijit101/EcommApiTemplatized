import express from "express";
import { CartItemController } from "./cartitems.controller.js";

const CartItemRouter = express.Router();
const cartItemController = new CartItemController();

CartItemRouter.delete('/:id',cartItemController.DeleteItem);
CartItemRouter.post("/addtocart",cartItemController.addToCart);
CartItemRouter.get("/getCart",cartItemController.getUserCart);


export default CartItemRouter;