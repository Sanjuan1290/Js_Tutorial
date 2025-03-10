import { products } from "../data/products.js";


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
                <select>
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
                <button>Add to cart</button>
              </div>
        </div>

    `
})