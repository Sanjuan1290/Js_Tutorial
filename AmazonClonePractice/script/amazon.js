import { products } from "../data/products.js";
import { cart, addToCart, updateCartQuantity} from "../data/cart.js";

updateCartQuantity()

products.forEach((product) =>{
    document.querySelector('.main-container').innerHTML +=
    `
        <div class="product-container">
            <div class="product-image">
                <img src="${product.image}">
            </div>

            <div class="product-name">
                <p>${product.name}</p>
            </div>

            <div class="product-rating">
                <img src="images/ratings/rating-${(product.rating.stars) * 10}.png">
                <p class="rating-count">${product.rating.count}</p>
            </div>

            <div class="product-price">
                <p>$${((product.priceCents) / 100).toFixed(2)}</p>
            </div>

            <div class="product-quantity-container">
                <select class="product-quantity-value-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div class="product-addtocart-button">
                <button class="addToCart-button js-addToCart-button-${product.id}" data-product-id="${product.id}">Add to cart</button>
                    <div class="added-Notif-${product.id} " style="display:none;">
                        <div>&#x2714;</div>
                        <p>Added</p>
                    </div>

              </div>
        </div>
    `;



})


document.querySelectorAll(`.addToCart-button`).forEach(button => {

    button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        const quantity = Number(document.querySelector(`.product-quantity-value-${productId}`).value)

        addToCart(productId, quantity)
        updateCartQuantity()

        showAddedMessage(productId);
    })


    function showAddedMessage(productId){

        document.querySelector(`.added-Notif-${productId}`).style.cssText = `
        display: flex;
        gap: 10px;
        align-items: center;
        position: absolute;
        color: green;
        top: 10px;
    `;

        setTimeout(()=>{
        document.querySelector(`.added-Notif-${productId}`).style.display = 'none'
        }, 1000)

    }
})


