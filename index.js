import express from 'express';
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert {type:"json"};
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import CartItemRouter from './src/features/cart/cartitems.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';

const app = express();

app.use(bodyParser.json()); // to understand post json data
//routes 
app.use("/api-doc",swagger.serve,swagger.setup(apiDocs));
app.use("/api/users",userRouter);
// app.use("/api/products",basicAuthorizer,productRouter);
app.use("/api/products",jwtAuth,productRouter);
app.use("/api/cart",jwtAuth,CartItemRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce API");
})

app.listen(8080,()=>{
    console.log("server started at 8080");
})