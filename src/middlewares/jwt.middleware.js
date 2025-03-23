import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next)=>{
    // readtoken if no token error if ok then call next middleware
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).send("Unauthorized");
    }
    try{
        const payload = jwt.verify(token,"iPB4VvT2pv3Ky66IxActwYaH5PbW5Pn9");
    }catch(err){
        return res.status(401).send("Unauthorized");
    }
    next();
    
}

export default jwtAuth;