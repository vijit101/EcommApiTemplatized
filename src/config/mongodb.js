import { MongoClient } from "mongodb";

console.log("mongo db Activated");
const url = process.env.DB_URL;
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
