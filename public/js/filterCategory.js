const allProductsLink = document.getElementById('allProducts');
const boxContainer = document.getElementById('box-products-container');
const categoriesElements = document.querySelectorAll('#category');
const frutasLink = document.getElementById('frutas');
const verdurasLink = document.getElementById('verduras');
const hierbasLink = document.getElementById('hierbas');
const secosLink = document.getElementById('secos');

window.addEventListener('load', function(){
filterAllProducts()
filterFrutas()
filterVerduras()
filterHierbas()
filterSecos()
})

const filterAllProducts = () =>{
    allProductsLink.addEventListener('click', function(e){
        e.preventDefault()
        console.log('hola todos!'); 
        console.log(e.target.innerText.toLowerCase());  
        categoriesElements.forEach(category =>{
            console.log(category.innerText);
            category.parentElement.parentElement.style.display = 'block'
        })
          
       
    })
}

const filterFrutas = () =>{
    frutasLink.addEventListener('click', function(e){
        e.preventDefault()
        console.log(e.target.innerText.toLowerCase());
       
        categoriesElements.forEach(category =>{
            category.parentElement.parentElement.style.display = 'block'
            console.log(category.innerText);
            if(category.innerText !=e.target.innerText.toLowerCase()){
              return   category.parentElement.parentElement.style.display = 'none'
            }
            
        })
    })
}

const filterVerduras = () =>{
    verdurasLink.addEventListener('click', function(e){
        e.preventDefault()
        console.log(e.target.innerText.toLowerCase());
        
        categoriesElements.forEach(category =>{
            category.parentElement.parentElement.style.display = 'block'
            console.log(category.innerText);
            if(category.innerText !=e.target.innerText.toLowerCase()){
              return   category.parentElement.parentElement.style.display = 'none'
            }
            
        })
    })
}

const filterHierbas = () =>{
    hierbasLink.addEventListener('click', function(e){
        e.preventDefault()
        console.log(e.target.innerText.toLowerCase());
        
        categoriesElements.forEach(category =>{
            category.parentElement.parentElement.style.display = 'block'
            console.log(category.innerText);
            if(category.innerText !=e.target.innerText.toLowerCase()){
              return   category.parentElement.parentElement.style.display = 'none'
            }
            
        })
    })
}

const filterSecos = () =>{
    secosLink.addEventListener('click', function(e){
        e.preventDefault()
        console.log(e.target.innerText.toLowerCase());
        
        categoriesElements.forEach(category =>{
            category.parentElement.parentElement.style.display = 'block'
            console.log(category.innerText);
            if(category.innerText !=e.target.innerText.toLowerCase()){
              return   category.parentElement.parentElement.style.display = 'none'
            }
            
        })
    })
}
// <% let array = products.filter(product=>{%>
                        
//     <% return product.category_id === 1 %> 
// <%}) %> 
// <% console.log(array) %> 