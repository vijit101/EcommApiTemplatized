import { LikeRepositoryClass } from "./like.repository.js";


export class likeControllerclass{

    constructor(){
        this.likeRepoObj = new LikeRepositoryClass();
    }

    async LikeItemfx(req,res){
        try{
            const{id,collectionTypes} = req.body;
            const userId = req.userId;
            if(collectionTypes!='products' && collectionTypes!='categories'){
                return res.status(400).send("invalid collectionType send");
            }
            if(collectionTypes == "products"){
                this.likeRepoObj.likeProductfx(userId,id);
            }
            else{
                this.likeRepoObj.likeCategoryfx(userId,id);
            }
            return res.status(200).send("Data added successfully");


        }
        catch(err){
            console.log(err);
        }
    }

    async GetLikesfx(req,res){
        try{
            const{id,collectionTypes} = req.query;
            const likes = await this.likeRepoObj.getLikesfx(id,collectionTypes);
            return res.status(200).send(likes);

        }
        catch(err){
            console.log(err);
        }
    }
}