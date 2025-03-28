import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
export class UserController{
    async signUp(req,res){
        const {name,email,password,type} = req.body;
        let newuData =  await UserModel.SignUp(name,email,password,type);
        res.status(201).send(newuData);
    }

    signIn(req,res){
        let result = UserModel.SignIn(req.body.email,req.body.password);
        if(!result){
            return res.status(400).send("Incorrect Creds");
        }else{
            // send token 
            const token = jwt.sign({userId:result.id,email:result.email},"iPB4VvT2pv3Ky66IxActwYaH5PbW5Pn9",{expiresIn:"1h"});
            return res.status(200).send(token);
        }
    }
}