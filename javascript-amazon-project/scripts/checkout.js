import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { products, loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js'
// import '../data/cart-class.js';
// import '../data/backend-practice.js';



Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve("bb");
        })
    })
]).then((value) => {
    console.log(value);
    renderOrderSummary()
    renderPaymentSummary()
})

/*
new Promise((resolve) => {
    loadProducts(() => {
         console.log("Products Loaded");
        resolve();
    })

}).then(()=>{
    return new Promise((resolve) => {
        loadCart(() => {
            console.log('Cart Loaded');
            resolve();
        })
    })

}).then(() => {
    console.log("render");
    renderOrderSummary();
    renderPaymentSummary();
})
*/

/*
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

 /*
loadProducts(()=>{
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    })
}) 
*/