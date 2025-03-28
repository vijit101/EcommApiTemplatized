import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
export class UserController{

    constructor(){
        this.userRepository = new UserRepository;
    }
    async signUp(req,res){
        const {name,email,password,type} = req.body;
        let newuData =  new UserModel(name,email,password,type);
        await this.userRepository.SignUp(newuData);
        res.status(201).send(newuData);
    }
    

    async signIn(req,res,next){
        try{
            let result = await this.userRepository.SignIn(req.body.email,req.body.password);
        if(!result){
            return res.status(400).send("Incorrect Creds");
        }else{
            // send token 
            const token = jwt.sign({userId:result.id,email:result.email},"iPB4VvT2pv3Ky66IxActwYaH5PbW5Pn9",{expiresIn:"1h"});
            return res.status(200).send(token);
        }
        }catch(err){
            console.log(err);
            return res.status(400).send("Somthing went wrong");
        }
        
    }
}