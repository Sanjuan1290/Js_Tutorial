export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2
}];



export function addToCart(productId, quantity){
    cart.push({productId, quantity})
    // console.log(cart);
    // to be continue
}



let totalQuantity = 0
export function updateCartQuantity(quantity){

    const cartQuantity_elem = document.querySelectorAll('.js-cart-quantity')

    totalQuantity += quantity
    
    cartQuantity_elem.forEach(item =>{
        item.innerHTML = totalQuantity
    })


}
