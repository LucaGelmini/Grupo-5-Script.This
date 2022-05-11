window.addEventListener('load', function(){

const buttons = document.querySelectorAll('button');
const cartOrders = document.querySelector('tbody');
 
const ordersList = []
console.log(ordersList);


if(ordersList.length > 0){
    ordersList.forEach(order =>{
        const newOrder = document.createElement('tr');
        const orderData = document.createElement('td');
         orderData.innerHTML = order.name;
         orderData.innerHTML = order.price;
         orderData.innerHTML = order.unitMensure;
         orderData.innerHTML = order.mensureValue;
         orderData.appendChild(newOrder);
         newOrder.appendChild(cartOrders);
    })
}
 

 buttons.forEach(button =>{
     button.addEventListener('click', function(e){
       
         
         const product = {
             name:e.target.dataset.name,
             price:e.target.dataset.price,
             unitMensure: e.target.dataset.unit,
             mensureValue: e.target.dataset.value
         };
         ordersList.push(product)
     })
 })



})