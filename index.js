// load all the environment variables in application
import "./env.js";
import express from 'express';
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert {type:"json"};
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
//import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import CartItemRouter from './src/features/cart/cartitems.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cors from "cors";
import {loggerMiddleware,log} from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
import orderRouter from "./src/features/order/order.router.js";
import { ConnectUsingMongoose } from "./src/config/mongooseConfig.js";
import likeRouter from "./src/features/cart/like/like.router.js";

const app = express();

//middlewares
let corsOptions  = {
    origin : "http//localhost:5500",
    allowedHeaders:"*"
}
app.use(cors(corsOptions));
app.use(bodyParser.json()); // to understand post json data
app.use("/api-doc",swagger.serve,swagger.setup(apiDocs));
app.use(loggerMiddleware);

//routes 
app.use("/api/users",userRouter);
// app.use("/api/products",basicAuthorizer,productRouter);
app.use("/api/products",jwtAuth,productRouter);
app.use("/api/cart",jwtAuth,CartItemRouter);
app.use("/api/order",jwtAuth,orderRouter);
app.use("/api/likes",jwtAuth,likeRouter);
app.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce API");
})

app.use((err,req,res,next)=>{
    console.log(err);
    
    if(err instanceof ApplicationError){
        res.sendStatus(err.code).send(err.message);
    }
    log(err);
    // server error 
    res.status(500).send("something went wrong ");
})

// only executes if other paths do not pick up as this middleware is for not defined apis should be at end 
app.use((req,res)=>{
    res.status(404).send("API not found. Check Documentation localhost:8080/api-docs");
})

app.listen(8080,()=>{
    console.log("server started at 8080");
    ConnectUsingMongoose();
    // earlier we were using the mongo db directly 
    // connectToMongoDB();
})



// cors policy allows the api access only to a specific url without using cors library
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","http//localhost:5500"); // use "*" to allow access to all
//     res.header("Access-Control-Allow-Headers","Content-Type,Authorization");// allowed headers to be send to server from client use "*" instead of cotnetntypeline
//     //return ok for preflight request
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// });