import jwt from "jsonwebtoken";


const jwtAuth =(req,res,next)=>{
    // 1. read the tokan
    // console.log(req.headers);

    const tokan =req.headers['authorization'];
    
    // console.log(tokan);

   
    //2. if no tokan retun the error 
    if(!tokan){
        return res.status(401).send("Unauthorized")
    }

    //3. cheak if tokan is valid or not 
    try{
        const payload = jwt.verify(tokan, "eOuI73TDngNs9ZW5lFCYYkkrnGSC7dzv");

        req.userID =payload.userID;
        console.log("payload");
        console.log(payload);

    } catch(err){
        console.log(err);
        return res.status(401).send("Unauthorized")
    }
    
    next()

    //4. if tokan is valid call next middlewrar

    // else retun error
}

export default jwtAuth;
