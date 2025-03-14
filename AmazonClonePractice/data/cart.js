
export let cart = JSON.parse(localStorage.getItem('cartItems'))

cart ||= [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2
}];



export function addToCart(productId, quantity){

    let checkItem;

    cart.forEach(item =>{
        if(item.productId === productId){
            item.quantity += quantity
            checkItem = true;
        }
    })

    if(!checkItem){
        cart.push({productId, quantity})
    }

    localStorage.setItem('cartItems', JSON.stringify(cart))
}




export function updateCartQuantity(){

    const cartQuantity_elem = document.querySelectorAll('.js-cart-quantity')

    let totalQuantity = 0
    cart.forEach(item =>{
        totalQuantity += item.quantity
    })
    
    cartQuantity_elem.forEach(item =>{
        item.innerHTML = totalQuantity
    })


    localStorage.setItem('cartItems', JSON.stringify(cart))
}



export function deleteQuantity(productId){

    console.log(cart);
    cart = cart.filter(item => {
        return item.productId !== productId
    })

    document.querySelector(`.product-container-${productId}`).remove()

    updateCartQuantity()
}

