import { MongoClient } from "mongodb";

console.log("mongo db Activated");
const url = process.env.DB_URL;
let mongoClient = null;

export const connectToMongoDB = ()=>{
    MongoClient.connect(url).then(client=>{
        mongoClient = client;
        console.log("mongodb is connected");
        // this function creates counters cooecltion so we cna kind of map _id objectid to normal 1,2,3,4 etc ids
        // remove this mexy line for normal mongo db id's that are globally unique always 
        createCounter(client.db());
        createIndexes(client.db());
    }).catch(err=>{
        console.log(err);
    })
}

export const getClient = ()=>{
    return mongoClient;
}

export const getDB=()=>{
    if(mongoClient!=null){
        return mongoClient.db();
    }
}

const createCounter = async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:"cartItemId"});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:"cartItemId",value:0});
    }
}

const createIndexes = async(db)=>{
    try{
        await db.collection("products").createIndex({price:1}); // in products collection I need an ascendig property  
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});
    }catch(err){
        console.log(err);
    }
    console.log("indexes created");
}
