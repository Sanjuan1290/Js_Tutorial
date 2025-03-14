import { cart, updateCartQuantity, deleteQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let totalShippingCost = 0;

let totalItem = 0;
let totalItemPrice = 0;

let totalBeforeTax = 0;
let tax = .10;
let taxValue = 0;
let orderTotal = 0;


updateCartQuantity();
updateTotalCheckOutQuantity();
calculateOrderSummary();
updateOrderSummary();

const added_product_checkList = document.querySelector('.added-products-container')

added_product_checkList.innerHTML = ``;

cart.forEach(item =>{
    products.forEach(product=>{

        if(item.productId === product.id){

            added_product_checkList.innerHTML +=
            `
                <div class="product-container product-container-${product.id}">
                    <div class="delivery-date">
                        <p>Delivery date: Friday, March 21</p>
                    </div>
    
                    <div class="cart-item-details-container">
                        <div class="cart-item-details">
                            <img src="${product.image}">
    
                            <div class="item-details">
                                <p class="item-name">Black and Gray Athletic Cotton Socks - 6 pairs</p>
                                <p class="item-price item-price-${item.productId}"> $${((product.priceCents / 100) * item.quantity).toFixed(2)}</p>
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
                                <input type="radio" class="deliveryOptions" name="productId-${product.id}" value="0">
                                <div>
                                    <p class="option-date">Friday, March 24</p>
                                    <p class="option-delivery-price">FREE Shipping</p>
                                </div>
                            </div>
    
                            <div class="options">
                                <input type="radio" class="deliveryOptions" name="productId-${product.id}" value="4.99">
                                <div>
                                    <p class="option-date">Monday, March 18</p>
                                    <p class="option-delivery-price">$4.99 - Shipping</p>
                                </div>
                            </div>
    
                            <div class="options">
                                <input type="radio" class="deliveryOptions" name="productId-${product.id}" value="9.99">
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
        calculateOrderSummary()
        updateOrderSummary()
    })
    document.querySelector(`.delete-product-${item.productId}`).addEventListener('click', () =>{
        deleteQuantity(item.productId)
        updateTotalCheckOutQuantity()
        calculateOrderSummary()
        updateOrderSummary()
    })

    document.querySelectorAll(`input[name="productId-${item.productId}"]`).forEach(radio=>{
        radio.addEventListener('click', ()=>{
            if(radio.checked){
                calculateOrderSummary()
            }
        })
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


    cart.forEach((item)=>{
        if(productId === item.productId){
            item.quantity = Number(document.querySelector(`.input-quantity-${productId}`).value)

            updateCartQuantity();
            updateTotalCheckOutQuantity();
            products.forEach(product =>{
                if(product.id === item.productId){
                    document.querySelector(`.item-price-${productId}`).innerHTML = `$${((product.priceCents / 100) * item.quantity).toFixed(2)}`
                }
            })
        }
    })
}

function updateTotalCheckOutQuantity(){
    let totalQuantity = 0
    cart.forEach(item =>{
        totalQuantity += item.quantity
    })
    document.querySelector(`.number-of-items-in-cart`).innerHTML = `${totalQuantity} items`
}

function calculateOrderSummary(){

    totalShippingCost = 0;
    document.querySelectorAll(`.deliveryOptions`).forEach(radio => {
        if(radio.checked){
            totalShippingCost +=  Number(radio.value)
        }
    })

    totalItem = 0;
    totalItemPrice = 0;
    
    cart.forEach(item => {
        products.forEach(product => {
            if(item.productId === product.id){
                totalItem += item.quantity;
                totalItemPrice +=  Number(((product.priceCents / 100) * item.quantity).toFixed(2));
            }
        }) 
    })

    totalBeforeTax = Number((totalItemPrice + totalShippingCost).toFixed(2));
    taxValue = Number((totalBeforeTax * tax).toFixed(2));
    orderTotal = Number((totalBeforeTax + taxValue).toFixed(2));

    updateOrderSummary();
}

function updateOrderSummary(){
    document.querySelector('.order-summary-container').innerHTML = 
    `
        <p class="OrderSummary">Order Summary</p>
        <div class="summary-price-container">
            <div class="summary-text">
                <p>Items (${totalItem}):</p>
                <p>Shippping & handling:</p>
                <p>Total before tax:</p>
                <p>Estimated tax (${tax * 100}%):</p>
            </div>

            <div class="summary-price">
                <p>$${totalItemPrice}</p>
                <p>$${totalShippingCost.toFixed(2)}</p>
                <p>$${totalBeforeTax}</p>
                <p>$${taxValue}</p>
            </div>

            <div class="summary-price-line1"></div>
            <div class="summary-price-line2"></div>
        </div>
        

        <div class="orderTotal-container">
            <p class="orderTotal">Order total: </p>
            <p class="orderTotal-price">$${orderTotal}</p>
        </div>

        <div class="order-button">
            <button>Place your order</button>
        </div>
    `;
}

