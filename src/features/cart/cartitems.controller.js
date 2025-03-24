import CartItemModel from "./cartitems.model.js";


export class CartItemController{
    addToCart(req,res){
        let productId = req.query.productId;
        let quantity = req.query.quantity;
        // getting from token from payload 
        const userId = req.userId;

        const cartinfo = CartItemModel.addToCart(productId,userId,quantity);
        res.status(200).send(cartinfo);
    }

    getUserCart(req,res){
        const userId = req.userId;
        const cartitems = CartItemModel.getCartbyUserId(userId);
        res.status(200).send(cartitems);
    }

    DeleteItem(req,res){
        const userId = req.userId;
        const cartItemid = req.params.id;
        if(!userId){
            res.status(400).send("invalid User Id");
        }
        const delItem = CartItemModel.delete(cartItemid,userId);
        res.status(200).send(delItem);
    }
}