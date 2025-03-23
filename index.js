import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';

const app = express();

app.use(bodyParser.json()); // to understand post json data
//routes 

app.use("/api/users",userRouter);
app.use("/api/products",basicAuthorizer,productRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce API");
})

app.listen(8080,()=>{
    console.log("server started at 8080");
})