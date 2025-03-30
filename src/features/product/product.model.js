import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, prices, imageUrl, category, sizes,id) {
    
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.prices = prices;
    this.sizes = sizes;
    this._id = id;
  }

  static getAll(){
    return products;
  }

  static add(product){
    product.id = products.length+1;
    products.push(product);
    return product;
  }

  static get(id){
    const product = products.find(i=>i.id ==id);
    return product;
  }

  static filter(minPrice, maxPrice, category){
    let result = null;
    for(let i=0;i<products.length;i++){
      let price = products[i].prices;
      if((!minPrice || price>=minPrice) && (!maxPrice || price <=maxPrice) && (!category || products[i].category === category)){
        result = products[i];
      }
    }
    return result;
  }

  static rateProduct(userId, productId,rating){

    //validate user and product if they exist ? 
    const myuser = UserModel.getAllUser().find(u=>u.id == userId);
    if(!myuser){
      // return "user not found";
      throw new ApplicationError("user not found",400);
    }
    const prodfound = products.find(p=>p.id == productId);
    if(!prodfound){
      throw new ApplicationError("prod not found",404);
    }
    // add ratings if not ratings 
    if(!prodfound.ratings){
      prodfound.ratings = [];
      prodfound.ratings.push({
        userId : userId,
        rating:rating,
      });
    }else{
      const userAlreadyRatedIndx =  prodfound.ratings.findIndex(r=>r.userId == userId);
      if(userAlreadyRatedIndx >=0){
        prodfound.ratings[userAlreadyRatedIndx] = {userId: userId,rating:rating,};
      }else{
        prodfound.ratings.push({
          userId : userId,
          rating:rating,
        });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Super Shirt",
    "shirt ",
    100,
    "https://m.media-amazon.com/images/I/71fJvBpf9cL._AC_UY1100_.jpg",
    "clothing",
    ["L","M","XL"],
  ),
];
