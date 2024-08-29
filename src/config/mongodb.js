import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
// import { cli } from "winston/lib/winston/config";

dotenv.config();

const url = process.env.DB_URL;
// const url = 'mongodb://localhost:27017/sellPurchesBk';
console.log("URL: "+ url);

let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected");
            // createCounter(client.db());
            // createIndexes(client.db());

        })
        .catch(err=>{
            console.log(err);
        })
}
export const getDB = ()=>{
    return client.db();
}