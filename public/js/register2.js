 
const inputs = document.querySelectorAll('.formulario-register input');
const inputControl = document.getElementById('input-control');
const small = document.getElementById('small');

const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const userfile = document.getElementById('userfile');


const formularioRegister = document.querySelector('.formulario-register');
  
formularioRegister.addEventListener('submit', function(e){
    e.preventDefault();
    checkInputs()
     
    
     
  
})

const checkInputs = () =>{
    //Check que todos los campos no esten vacios
  for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const inputValue = input.value.trim()
      console.log(inputValue);
      if(inputValue === ''){
          setErrorFor(input, '* El campo no puede estar vacio')
      } else {
          setSuccessFor(input)
      }
      
  }

//Check que el campo nombre sea mayor a 2 caracteres
  if(fullname.value.length < 2){
     console.log(fullname.value.length);
    setErrorFor(fullname, '* El nombre completo debe tener al menos 2 caracteres')
  } else {
    setSuccessFor(fullname)
  }

  //Check que el campo username sea mayor a 2 caracteres
  if(username.value.length < 2){
    console.log(username.value.length);
   setErrorFor(username, '* El nombre completo debe tener al menos 2 caracteres')
 } else {
   setSuccessFor(username)
 }
  
   //Check que el campo email sea valido
 if(!validateEmail(email.value)){
     setErrorFor(email, '* Ingrese un email valido')
 } else {
     setSuccessFor(email)
 }

  //Check que el campo password sea mayor a 8 caracteres
  if(password.value.length < 8){
    console.log(password.value.length);
   setErrorFor(password, '* El nombre completo debe tener al menos 8 caracteres')
 } else {
   setSuccessFor(password)
 }
 
 // (Opcional) → No puede repetirse con los e-mails ya registrados.
 // (Opcional) → Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial.
 // Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).
 if( userfile.value){}
 
}

const setErrorFor = (input, message) =>{

    const small = document.createElement('div');
    
    small.className = 'small'
    small.setAttribute('id', 'small')
    
    const inputControl = input.parentElement;
    inputControl.appendChild(small)
    
    
    small.innerHTML = message  
   
    inputControl.className = 'input-control error' 
}

const setSuccessFor = (input) =>{
    const inputControl = input.parentElement;
    
    inputControl.className = 'input-control success'
}

const resetForm = () => {
  let elems = document.querySelectorAll(".small");  
  
  elems.forEach(itm => {
    let errorDiv = document.getElementById(itm.id)
    errorDiv.innerHTML = "";
  })
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

 