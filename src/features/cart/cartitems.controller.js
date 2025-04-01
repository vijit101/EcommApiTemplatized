import { ApplicationError } from "../../error-handler/applicationError.js";
import CartItemModel from "./cartitems.model.js";
import CartItemsRepository from "./cartitems.repository.js";


export class CartItemController{

    constructor(){
        this.cartItemRepo = new CartItemsRepository();
    }

    async addToCart(req,res){
        try{
            let productId = req.query.productId;
            let quantity = parseFloat(req.query.quantity);
            // getting from token from payload 
            const userId = req.userId;
    
            const cartinfo = await this.cartItemRepo.addToCart(productId,userId,quantity);
            res.status(200).send(cartinfo);
        }catch(err){
            console.log("cart items Addto cart:" + err);
            res.status(200).send("cart Item Not Found");
        }
       
    }

    async getUserCart(req,res){
        try{
            const userId = req.userId;
            const cartitems = await this.cartItemRepo.getCartbyUserId(userId);
            res.status(200).send(cartitems);

        }catch(err){
            console.log("cart items getuser cart:" + err);
            res.status(200).send("cart Item Not Found");
            
        }
       
    }

    async DeleteItem(req,res){
        try{
            const userId = req.userId;
            const cartItemid = req.params.id;
            if(!userId){
                res.status(400).send("invalid User Id");
            }
            const delItem = await this.cartItemRepo.delete(cartItemid,userId);
            res.status(200).send(delItem);
        }
        catch(err){
            console.log("cart items delete :" + err);
            res.status(200).send("cart Item Not Found");
        }
        
    }
}