import { LikeRepositoryClass } from "./like.repository";


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
            if(type == "products"){
                this.likeRepoObj.likeProductfx(userId,id);
            }
            else{
                this.likeRepoObj.likeCategoryfx(userId,id);
            }

        }
        catch(err){
            console.log(err);
        }
    }
}