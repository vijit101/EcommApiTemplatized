import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
let mongoClient = null;

export const connectToMongoDB = ()=>{
    MongoClient.connect(url).then(client=>{
        mongoClient = client;
        console.log("mongodb is connected");
    }).catch(err=>{
        console.log(err);
    })
}

export const getDB=()=>{
    if(mongoClient!=null){
        return mongoClient.db();
    }
}
