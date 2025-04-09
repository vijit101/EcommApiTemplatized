
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req,res){
        const prods =  await this.productRepository.getAll();
        res.status(200).send(prods);
    }

    // addProduct(req,res){
    //     const {name,price,sizes} =  req.body;
    //     const newprod = {
    //         name,
    //         price:parseFloat(price),
    //         sizes : sizes.split(','),
    //         imageUrl: req.file.filename,
    //     }
    //     const createdRecord = 
    //     console.log("post product update req successful");
        
    //     res.status(201).send(createdRecord);
    // }

    async addProduct(req,res){
        const {name,desc,price,sizes,category,stock} =  req.body;
        const newprod = {
            name,
            desc,
            price:parseFloat(price),
            sizes : sizes.split(','),
            category : category,
            imageUrl: req.file.filename,
            stock:parseInt(stock)
        }
        const createdRecord = await this.productRepository.Add(newprod);
        console.log("post product update req successful");
        
        res.status(201).send(createdRecord);
    }

    async getOneProduct(req,res){
        const id = req.params.id;
        const prod = await this.productRepository.get(id);
        if(!prod){
            res.status(404).send("prod not found");
        }else{
            return res.status(200).send(prod);
        }
    }
    // getOneProduct(req,res){
    //     const id = req.params.id;
    //     const prod = ProductModel.get(id);
    //     if(!prod){
    //         res.status(404).send("prod not found");
    //     }else{
    //         return res.status(200).send(prod);
    //     }
    // }

    async filterProducts(req,res){
        const minPrice = req.query.minPrice;
        //const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const namePriceRatingView = req.query.namePriceRatingView;
        const result =  await this.productRepository.filter(minPrice,category,namePriceRatingView);
        // earlier fx filter(minPrice,maxPrice,category);

        //const result =  ProductModel.filter(minPrice,maxPrice,category);
        return res.status(200).send(result);
    }

    async FindAvgPrice(req,res,next){
       try{
        const result = await this.productRepository.avgPricePerCategory();
        res.status(200).send(result);
       }catch(err){
        console.log(err);
       }
        
    }

  

    async rateProduct(req,res,next){
        const userId  = req.userId;
        const productId = req.body.productId;
        const rating = req.body.rating;
        try{
            await this.productRepository.rate(userId,productId,rating);
        }catch(err){
            console.log(err);
            return res.status(400).send(err.message);
            
        }
        return res.status(200).send("rating updated");
    }
}