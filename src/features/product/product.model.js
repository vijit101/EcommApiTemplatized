export default class ProductModel {
  constructor(id, name, desc, prices, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.prices = prices;
    this.sizes = sizes;
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
