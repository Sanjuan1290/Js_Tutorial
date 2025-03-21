class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
      this.localStorageKey = localStorageKey;
      this.localStorageKey = localStorageKey;

      this.loadFromStorage()
      this.loadFromStorage()
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
      
        if(!this.cartItems){
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
    }

    addToCart(productId, quantity){
        let matchingItem;
        this.cartItems.forEach(cartItem => {
          if(productId === cartItem.productId){
            matchingItem = cartItem
          }
        });
    
        if(matchingItem){
          matchingItem.quantity += quantity;
        }else{
          this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
          })
        }
    
        this.saveToStorage();
    }

    removeFromCart(productId){
    
        let updatedCart = this.cartItems.filter(cartItem =>{
          return cartItem.productId !== productId
        })
      
        this.cartItems = updatedCart;
      
        this.saveToStorage();
    }

    updateDeliveryOption (productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach(cartItem => {
          if(productId === cartItem.productId){
            matchingItem = cartItem
          }
        });
      
        matchingItem.deliveryOptionId = deliveryOptionId
      
        this.saveToStorage()
    }

    calculateCartQuantity (){
        let cartQuantity = 0
        this.cartItems.forEach(item => {
            cartQuantity += item.quantity
        })
    
        return cartQuantity
    }

    updateQuantity(productId, newQuantity){
    
        this.cartItems.forEach(item => {
            if(item.productId === productId){
                item.quantity = newQuantity
            }
        })
    
        this.saveToStorage()
    }
}


const cart = new Cart('cart-opp');
const businessCart = new Cart('cart-business');



cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 5)
console.log(cart);
console.log(businessCart);


