import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
//routes 
app.use("/api/products",productRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce API");
})

app.listen(8080,()=>{
    console.log("server started at 8080");
})