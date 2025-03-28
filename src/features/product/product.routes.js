import express from "express";
import ProductController from "./product.controller.js";
import {upload} from "../../middlewares/fileupload.middleware.js";
const productRouter = express.Router();
const prodController = new ProductController();

productRouter.get('/filter',prodController.filterProducts);
productRouter.get("/",prodController.getAllProducts);
productRouter.post("/",upload.single('imageUrl'),prodController.addProduct);
productRouter.get('/:id',prodController.getOneProduct);
productRouter.post("/rate",prodController.rateProduct);

export default productRouter;