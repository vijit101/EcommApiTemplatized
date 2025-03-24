
import ProductModel from "./product.model.js";
export default class ProductController{
    getAllProducts(req,res){
        const prods =  ProductModel.getAll();
        res.status(200).send(prods);
    }

    addProduct(req,res){
        const {name,price,sizes} =  req.body;
        const newprod = {
            name,
            price:parseFloat(price),
            sizes : sizes.split(','),
            imageUrl: req.file.filename,
        }
        const createdRecord = ProductModel.add(newprod);
        console.log("post product update req successful");
        
        res.status(201).send(createdRecord);
    }

    getOneProduct(req,res){
        const id = req.params.id;
        const prod = ProductModel.get(id);
        if(!prod){
            res.status(404).send("prod not found");
        }else{
            return res.status(200).send(prod);
        }
    }

    filterProducts(req,res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result =  ProductModel.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
    }

    rateProduct(req,res){
        const userId  = req.query.userId;
        const productId = req.query.productId;
        const rating = req.query.rating;
        const error =  ProductModel.rateProduct(userId,productId,rating);
        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(200).send("rating updated");
        }
    }
}