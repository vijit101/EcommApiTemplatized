import { UserModel } from "../features/user/user.model.js";


const basicAuthorizer = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("no Auth details found");

    }
    console.log("Auth head : "+authHeader);
    // auth header be liek [basic qedfadasdas]
    const base64creds = authHeader.replace("Basic","");
    // decode 
    console.log("w/o base : "+base64creds);
    // boiler plate kinda code 
    const decodedCreds = Buffer.from(base64creds,"base64").toString("utf8");
    console.log("decoded auth header : "+decodedCreds);// [username:password]
    const creds = decodedCreds.split(":");
    const user = UserModel.getAllUser().find(u=>u.email == creds[0] && u.password ==creds[1]);
    if(user){
        next();
    }
    else{
        res.status(401).send("Incorret Auth");
    }
}

export default basicAuthorizer;  
