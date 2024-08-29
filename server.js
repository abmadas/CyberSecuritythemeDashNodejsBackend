import './env.js';
import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongoDB } from './src/config/mongodb.js';
// import firmRouter from './src/features/Masters/firmMaster/firrmmaster.routes.js';
import userRouter from './src/features/users/user.routes.js';
// import jwtAuth from './src/middlewears/jwt.middleweare.js';
import cors from 'cors';


const app = express();
const port = 3100;

var corsOptions= {
    origin:'*',
    
}

app.use(cors(corsOptions));


app.use(bodyParser.json())


//firm Master APis
app.use("/api/user",userRouter);


app.get("/",(req,res,next)=>{
    res.send("Welcome to Sell-Purches API");
})

app.listen(port,()=>{
    console.log("server is listening on 3100");
    connectToMongoDB();

})