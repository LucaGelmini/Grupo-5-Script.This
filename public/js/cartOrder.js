window.addEventListener('load', function(){
    readLocalStorage()
    quantityCondition()
    updateCartSubtotal()
    updateCartTotal()
    removeCartItem()
    purchaseProcess()
})


function getProductLocalStorage(){
    let productsLocalStorage;
    if(localStorage.getItem('productos') === null){
        productsLocalStorage = []
    } else {
        productsLocalStorage = JSON.parse(localStorage.getItem('productos'))
    }
    return productsLocalStorage
}

function readLocalStorage() {
    let productsLocalStorage;
    productsLocalStorage = getProductLocalStorage();
    productsLocalStorage.forEach(product =>{
           
        let price = product.price;
        let name = product.name;
        let quantity = product.value;
        let subtotal = price * quantity;
        console.log(name);

        let cartItemContainer = document.getElementsByClassName('cart-items')[0];

        let newRowCart = document.createElement('tr');
        newRowCart.classList.add('cart-row');
        cartItemContainer.appendChild(newRowCart);

        let quantityData = document.createElement('td');
        newRowCart.classList.add('order-quantity-container');
        quantityData.innerHTML = `<input type="number" name="product_quantity" class="order-quantity" id="order-quantity" value=${quantity}>`;

        let nameData = document.createElement('td');
        nameData.classList.add('product-name-order');
        nameData.innerHTML = name;

        let priceData = document.createElement('td');
        priceData.classList.add('order-price');
        priceData.innerText = '$'+price;

        let subTotal = document.createElement('td');
        subTotal.classList.add('subtotal-product')
        subTotal.innerHTML = `$<input type="number"  name="total" class="subtotal-product" id="subtotal-product" value=${subtotal} readonly>`;

        let cancelData = document.createElement('td');
        cancelData.innerHTML = '<i class="fas fa-solid fa-ban"></i>';

        
        newRowCart.appendChild(nameData);
        newRowCart.appendChild(quantityData);
        newRowCart.appendChild(priceData);
        newRowCart.appendChild(subTotal);
        newRowCart.appendChild(cancelData);

    })
}

const removeCartItem = () => {
    let removeCartItemButtons = document.getElementsByClassName('fas fa-solid fa-ban');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
       let removeButton = removeCartItemButtons[i];
       removeButton.addEventListener('click', removeItem)  
   }
}
const removeItem = (e) =>{
    console.log('clicked');
    let productNameElement, productName;
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    productNameElement = buttonClicked.parentElement.parentElement.getElementsByClassName('product-name-order')[0];
    console.log(productNameElement);
    productName = productNameElement.innerText
    console.log(productName);
    removeProductLocalStorage(productName);
    updateCartTotal(); 
}

const updateCartSubtotal = () =>{
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
 
   
    

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('order-price')[0];
        let quantityElement = cartRow.getElementsByClassName('order-quantity')[0];
        let subTotalElement = cartRow.getElementsByClassName('subtotal-product')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        subTotalElement.innerHTML = `$<input type="number" name="total" class="subtotal-product" id="subtotal-product" value=${price*quantity} readonly>`;
        
    }
     
}

const updateCartTotal = () =>{
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    console.log(cartRows);
    let total = 0; // usamos let ya que el valor cambia N veces
   
    

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        console.log(cartRow);
        let priceElement = cartRow.getElementsByClassName('order-price')[0];
        let quantityElement = cartRow.getElementsByClassName('order-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        console.log(total);
    }
    total = Math.round(total*100)/100
  document.getElementsByClassName('text-total')[0].innerText = `TOTAL $ ${total}`
}

const quantityCondition = () =>{
    let quantityElements = document.getElementsByClassName('order-quantity');
    for (let i = 0; i < quantityElements.length; i++) {
        let quantity = quantityElements[i];
        quantity.addEventListener('change', quantityChanged)    
    }
}
const quantityChanged = (e) =>{
    let input = e.target 
    if(isNaN(input.value) || input.value <= 0){
     input.value = 1
    }
    updateCartTotal()
    updateCartSubtotal()
}

function removeProductLocalStorage (productName) {
    let productsLocalStorage;
    productsLocalStorage = getProductLocalStorage()
    productsLocalStorage.forEach((productLS, index)=>{
        if(productLS.name === productName){
            productsLocalStorage.splice(index, 1);
        }
    });
    localStorage.setItem('productos', JSON.stringify(productsLocalStorage));
}

function purchaseProcess(){
    let confirmPurchaseButton = document.querySelector('.confirm-cart');  
    let userNameElement = document.getElementById('user-logIn-name');

    

    confirmPurchaseButton.addEventListener('click', function(e){
        e.preventDefault()
        console.log(userNameElement);
        if(getProductLocalStorage().length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Antes de comprar debe agregar productos a su carrito',
              }).then(function(){
                  window.location = 'products'
              })
            return
            // Hacer un else if de userlogged o usar middelware de auth en la ruta para crear una compra 
        } 
        else if(!userNameElement){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes realizar LOG IN antes de confirmar la compra',
              }).then(function(){
                  window.location = 'users/login'
              })
            return
        } 
        else {
            const itemsToBuy = [];
            console.log(itemsToBuy);
            let cartItemContainer = document.getElementsByClassName('cart-items')[0];
            let cartRows = cartItemContainer.getElementsByClassName('cart-row');
            for (let i = 0; i < cartRows.length; i++) {
                const product = cartRows[i];
                let obj = {
                    name: product.getElementsByClassName('product-name-order')[0].innerText,
                    product_quantity: product.getElementsByClassName('order-quantity')[0].value,
                    price: product.getElementsByClassName('order-price')[0].innerText
                }
                
                itemsToBuy.push(obj)
                
            }
            fetch('http://localhost:3001/api/cartOrder',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(itemsToBuy)
            }).then(console.log)
        }
    })
}

function removeAllLocalStorage(){
    localStorage.clear();
}

// function purchaseProcess(){
//     let confirmPurchaseButton = document.querySelector('.confirm-cart')

//     confirmPurchaseButton.addEventListener('click', function(e){
//         e.preventDefault()
//         if(getProductLocalStorage().length === 0){
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Antes de comprar debe agregar productos a su carrito',
//               }).then(function(){
//                   window.location = 'products'
//               })
//             return
//             // Hacer un else if de userlogged o usar middelware de auth en la ruta para crear una compra 
//         } 
//         else {
//             location.href = 'products';
//             removeAllLocalStorage()
//         }
//     })
// }

// function removeAllLocalStorage(){
//     localStorage.clear();
// }