import { cart } from "../data/cart.js";
import { products } from "../data/products.js";




const added_product_checkList = document.querySelector('.added-products-container')

added_product_checkList.innerHTML = ``;

cart.forEach(item =>{

    products.forEach(product=>{

        if(item.productId === product.id){

            added_product_checkList.innerHTML += 
            `
                <div class="product-container">
                    <div class="delivery-date">
                        <p>Delivery date: Friday, March 21</p>
                    </div>
    
                    <div class="cart-item-details-container">
                        <div class="cart-item-details">
                            <img src="${product.image}">
    
                            <div class="item-details">
                                <p class="item-name">Black and Gray Athletic Cotton Socks - 6 pairs</p>
                                <p class="item-price"> $${((product.priceCents / 100) * item.quantity).toFixed(2)}</p>
                                <div class="item-details-quantity-container">

                                    <p class="item-quantity-${item.productId}">Quantity: ${item.quantity}</p> 
                                    <span class="hidden-item-quantity-${item.productId}" style="display:none;"> Quantity: <input class="input-quantity-${item.productId}" type="number" value="${item.quantity}"></span>  

                                    <p class="update-quantity update-quantity-${item.productId}">Update</p> 
                                    <p class="delete-product delete-product-${item.productId}">Delete</p>
                                </div>
                            </div>
                        </div>
    
    
                        <div class="delivery-options">
                            <div class="delivery-option-text">
                                Choose a delivery option:
                            </div>
    
                            <div class="options">
                                <input type="radio" name="productId-1">
                                <div>
                                    <p class="option-date">Friday, March 24</p>
                                    <p class="option-delivery-price">FREE Shipping</p>
                                </div>
                            </div>
    
                            <div class="options">
                                <input type="radio" name="productId-1">
                                <div>
                                    <p class="option-date">Monday, March 18</p>
                                    <p class="option-delivery-price">$4.99 - Shipping</p>
                                </div>
                            </div>
    
                            <div class="options">
                                <input type="radio" name="productId-1">
                                <div>
                                    <p class="option-date">Thursday, March 14</p>
                                    <p class="option-delivery-price">$9.99 - Shipping</p>
                                </div>
                            </div>
    
    
                        </div>
                    </div>
                </div>
            `;
        };
    })
});

cart.forEach(item =>{
    
    document.querySelector(`.update-quantity-${item.productId}`).addEventListener('click', () =>{
        updateQuantity(item.productId)
    })
    document.querySelector(`.delete-product-${item.productId}`).addEventListener('click', () =>{
        deleteQuantity(item.productId)
    })
  
})

function updateQuantity(productId){
    let updateBtn = document.querySelector(`.update-quantity-${productId}`);

    if( updateBtn.innerHTML === 'Update'){
        document.querySelector(`.hidden-item-quantity-${productId}`).style.display = 'flex'
        document.querySelector(`.item-quantity-${productId}`).style.display = "none"
        updateBtn.innerHTML = 'Save'
    }else if(updateBtn.innerHTML === 'Save'){
        document.querySelector(`.hidden-item-quantity-${productId}`).style.display = 'none'
        document.querySelector(`.item-quantity-${productId}`).style.display = "flex"

        document.querySelector(`.item-quantity-${productId}`).innerHTML = `Quantity: ${document.querySelector(`.input-quantity-${productId}`).value}`
        updateBtn.innerHTML = 'Update'
    }



    
    
}

function deleteQuantity(productId){
    console.log("d" + productId);
}



