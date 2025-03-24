

export default class CartItemModel{
    constructor(productId,userId,quantity,id){
        
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }

    static addToCart(productId,userId,quantity){
        const cartItem = new CartItemModel(productId,userId,quantity);
        cartItem.id = cartItems.length+1;
        cartItems.push(cartItem);   
        return cartItem;
    }

    static getCartbyUserId(userId){
        const userCartItems = cartItems.filter(c=>c.userId==userId);
        return userCartItems;
    }

    static delete(cartItemid,userId){
        const cartItemIndx = cartItems.findIndex(i=>i.id == cartItemid && i.userId == userId);
        if(cartItemIndx==-1){
            return "cart Item not Find";
        }else{
            const deleteditem = cartItems[cartItemIndx];
            cartItems.splice(cartItemIndx,1);
            return deleteditem;
        }
    }
}

let cartItems = [
    new CartItemModel(1,2,1,1),
    new CartItemModel(2,1,2,2),
];