import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json()); // to understand post json data
//routes 
app.use("/api/products",productRouter);
app.use("/api/users",userRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce API");
})

app.listen(8080,()=>{
    console.log("server started at 8080");
})