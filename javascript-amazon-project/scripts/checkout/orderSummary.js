import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct, loadProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

import {deliveryOptions, getDeliveryOption, isWeekEnd} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'



export function renderOrderSummary(){
    let cartSummaryHTML = '';

    document.querySelector(`.checkout-header-middle-section`).innerHTML = `
        Checkout (<a class="return-to-home-link"
        href="amazon.html">${calculateCartQuantity()} items</a>)
    `

    cart.forEach((cartItem) =>{
        const productId = cartItem.productId;
        let matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM D')
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: 
                            <span class="quantity-label quantity-label-${matchingProduct.id}">
                                ${cartItem.quantity}
                            </span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                            Update
                        </span>

                        <input type="number" class="quantity-input quantity-input-${matchingProduct.id}" value="1">
                        <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                            Save
                        </span>

                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
    `;

    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')

            let dateString = isWeekEnd(deliveryDate);

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''}  class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `
        });

        return html;
    }


    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
            link.addEventListener('click', ()=>{

                const productId = link.dataset.productId
                removeFromCart(productId);
                
                renderOrderSummary();
                updateCheckOutQuantity();
                renderPaymentSummary();
                
            })
        })

    document.querySelectorAll(`.js-update-link`).forEach(link => {
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId

            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity')
            
            document.querySelector(`.quantity-input-${productId}`).value = document.querySelector(`.quantity-label-${productId}`).innerHTML.trim()

            document.querySelector(`.quantity-label-${productId}`).innerHTML = ''
            link.style.display = 'none'
        })
    })

    document.querySelectorAll(`.save-quantity-link`).forEach(link => {
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId
            console.log(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity')
            
            document.querySelector(`.js-update-link[data-product-id="${productId}"]`).style.display = 'initial'

            let newQuantityValue = Number(document.querySelector(`.quantity-input-${productId}`).value)
            document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantityValue          
            updateQuantity(productId, newQuantityValue)
            updateCheckOutQuantity()
            renderOrderSummary();
            renderPaymentSummary();
        })
    })

    document.addEventListener('DOMContentLoaded', () => {
        updateCheckOutQuantity()
    })

    function updateCheckOutQuantity(){
        document.querySelector('.return-to-home-link').innerHTML = `${calculateCartQuantity()} items`
    }

    document.querySelectorAll(`.js-delivery-option`).forEach(element => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;

            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    })
}

