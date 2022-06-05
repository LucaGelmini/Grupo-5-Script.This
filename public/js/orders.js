window.addEventListener('load', function(){
   readLocalStorage()
   updateCartTotal()
   removeCartItem()
   quantityCondition()
   addCartItem()
   removeCart()
   purchase()
 })

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
    updateCartTotal();
    removeProductLocalStorage(productName);
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
}
const addCartItem = () => {
    let addCartButtons = document.getElementsByClassName('cart-button');
    for (let i = 0; i < addCartButtons.length; i++) {
        let addCartButton = addCartButtons[i];
        addCartButton.addEventListener('click', function(e){
            let addCartButtonClicked = e.target.dataset
            console.log(addCartButtonClicked);
             
            let price = addCartButtonClicked.price;
            let name = addCartButtonClicked.name;

            console.log(price, name);
            console.log(e.target.dataset);

            let cartItemContainer = document.getElementsByClassName('cart-items')[0];
            let cartItemsNames = cartItemContainer.getElementsByClassName('product-name-order');

            for (let i = 0; i < cartItemsNames.length; i++) {
                let productName = cartItemsNames[i].innerText;
                if(productName == name){
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: 'El producto ya se encuentra en carrito',
                      })
                    return
                }
            }

            let newRowCart = document.createElement('tr');
            newRowCart.classList.add('cart-row');
            cartItemContainer.appendChild(newRowCart);

            let quantityData = document.createElement('td');
            quantityData.innerHTML =  '<input type="number" name="" class="order-quantity" id="order-quantity" value="1">';

            let nameData = document.createElement('td');
            nameData.classList.add('product-name-order');
            nameData.innerText = name;

            let priceData = document.createElement('td');
            priceData.classList.add('order-price');
            priceData.innerText = '$'+price;

            let cancelData = document.createElement('td');
            cancelData.innerHTML = '<i class="fas fa-solid fa-ban"></i>';

            newRowCart.appendChild(quantityData);
            newRowCart.appendChild(nameData);
            newRowCart.appendChild(priceData);
            newRowCart.appendChild(cancelData);

             

            //Agregar funcion AddEventListener para las nuevas ordenes creadas en Carrito que antes no estaban cuando se cargo "load" la pagina. Si esta funcion no se podría remover las nuevas ordenes.
            let removeButtons = newRowCart.getElementsByClassName('fas fa-solid fa-ban')[0];
            removeButtons.addEventListener('click', removeItem);

            let quantityInputs = newRowCart.getElementsByClassName('order-quantity')[0];
            quantityInputs.addEventListener('change', quantityChanged) ;

            updateCartTotal();
            storeProductLocalStorage(addCartButtonClicked);
        })
    }
    
}
const updateCartTotal = () =>{
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0; // usamos let ya que el valor cambia N veces
   
    

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('order-price')[0];
        let quantityElement = cartRow.getElementsByClassName('order-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        console.log(total);
    }
    total = Math.round(total*100)/100
  document.getElementsByClassName('cart-total')[0].innerText = `SUBTOTAL $ ${total}`
}
const removeCart = () =>{
    let removeAllCartButton = document.getElementsByClassName('remove-cart-button')[0];
    removeAllCartButton.addEventListener('click', confirmRemoveAllCart )
}
const confirmRemoveAllCart = () =>{
   
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    while (cartItemContainer.hasChildNodes()){
         // Hacemos un loop eliminando cada orden hasta que no queden mas.
        cartItemContainer.removeChild(cartItemContainer.firstChild);
    }
    updateCartTotal()
    removeAllLocalStorage()
}

function removeAllLocalStorage(){
    localStorage.clear();
}

function purchase(){
    const purchaseButton = document.getElementsByClassName('purchase-button')[0];
    purchaseButton.addEventListener('click', function(e){
        e.preventDefault();
        if(getProductLocalStorage().length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Antes de comprar debe agregar productos a su carrito',
              })
            return
        } else {
            location.href = 'cartOrder';
        }
    })
}

function storeProductLocalStorage(product){
    let products;
    products = this.getProductLocalStorage();
    products.push(product);
    localStorage.setItem('productos', JSON.stringify(products))
}

function getProductLocalStorage(){
    let productsLocalStorage;
    if(localStorage.getItem('productos') === null){
        productsLocalStorage = []
    } else {
        productsLocalStorage = JSON.parse(localStorage.getItem('productos'))
    }
    return productsLocalStorage
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

function readLocalStorage() {
    let productsLocalStorage;
    productsLocalStorage = getProductLocalStorage();
    productsLocalStorage.forEach(product =>{
           
        let price = product.price;
        let name = product.name;

        let cartItemContainer = document.getElementsByClassName('cart-items')[0];

        let newRowCart = document.createElement('tr');
        newRowCart.classList.add('cart-row');
        cartItemContainer.appendChild(newRowCart);

        let quantityData = document.createElement('td');
        quantityData.innerHTML = `<input type="number" name="" class="order-quantity" id="order-quantity" value=${product.value}>`;

        let nameData = document.createElement('td');
        nameData.classList.add('product-name-order');
        nameData.innerText = name;

        let priceData = document.createElement('td');
        priceData.classList.add('order-price');
        priceData.innerText = '$'+price;

        let cancelData = document.createElement('td');
        cancelData.innerHTML = '<i class="fas fa-solid fa-ban"></i>';

        newRowCart.appendChild(quantityData);
        newRowCart.appendChild(nameData);
        newRowCart.appendChild(priceData);
        newRowCart.appendChild(cancelData);

    })
}







   



   