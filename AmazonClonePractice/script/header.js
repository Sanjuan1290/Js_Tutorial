const amazon_header_right_section = document.querySelector('.amazon-header-right-section') 

changeToBurgerMenu()
function changeToBurgerMenu(){
    if(window.matchMedia("(max-width: 570px)").matches){
    amazon_header_right_section.innerHTML =
    `
        <img class="menuBurgerIcon" src="amazon-Image/headerImages/cart-image/burgenMenu.png" alt="burgerMenu">
    `
    showBurgerMenu()
    }else {
        amazon_header_right_section.innerHTML =
        `
        <div class="return-order-container">
            <p>Returns</p>
            <p>& Orders</p>
        </div>

        <div class="cart-container">
            <img class="cartIcon" src="amazon-Image/headerImages/cart-image/cart.png" alt="cartIcon">
            <p>Cart</p>
            <p class="cart-quantity js-cart-quantity">0</p>
        </div>
        `
    }
}


window.addEventListener('resize', changeToBurgerMenu);

function showBurgerMenu(){
    document.querySelector('.menuBurgerIcon').addEventListener('click', () => {
    const burgerMenu = document.querySelector('.header-burgerMenu');

    if(burgerMenu.classList.contains('header-burgerMenu-transition')){
        burgerMenu.classList.remove('header-burgerMenu-transition')
    }else{
            burgerMenu.innerHTML = `
            <div class="return-orders">Returns & Orders</div>
            <div class="cart">Cart (<p style="color: rgb(234, 148, 44); display: inline-block;">0</p>)</div>
            `;

            burgerMenu.classList.add('header-burgerMenu-transition')
        }
    });
}