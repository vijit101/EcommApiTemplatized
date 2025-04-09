import express from "express";
import ProductController from "./product.controller.js";
import {upload} from "../../middlewares/fileupload.middleware.js";
const productRouter = express.Router();
const prodController = new ProductController();

productRouter.get('/filter',(req,res)=>{
    prodController.filterProducts(req,res);
});
productRouter.get("/",(req,res)=>{
    prodController.getAllProducts(req,res);
});
productRouter.post("/",upload.single('imageUrl'),(req,res)=>{
    prodController.addProduct(req,res);
});

productRouter.get("/averagePrice",(req,res,next)=>{
    prodController.FindAvgPrice(req,res,next);
});
productRouter.get('/:id',(req,res)=>{
    prodController.getOneProduct(req,res);
});
productRouter.post("/rate",(req,res,next)=>{
    prodController.rateProduct(req,res,next);
});


export default productRouter;