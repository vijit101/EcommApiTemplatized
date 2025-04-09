import OrderRepository from "./order.repository.js"


export default class OrderController{

    constructor(){
        this.orderRepo = new OrderRepository();
    }
    async placeOrder(req,res,next){
        try{
            const userId = req.userId;
            const OrderDetails =  await this.orderRepo.placeOrder(userId);
            return res.status(200).send(OrderDetails);
            
        }catch(err){
            console.log(err);
            return res.status(400).send(err.message);
        }
    }
}