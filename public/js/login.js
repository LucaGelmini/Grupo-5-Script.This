const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.querySelector('.formulario-login');
const errors = [];


window.addEventListener('load', function(){
    
    form.addEventListener('submit', function(e){
        e.preventDefault();

        errors.splice(0, errors.length)
        console.log(errors);
        checkInputs();
    
        if(errors.length < 1){
            form.submit()
        }
    })
   

})

const checkInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue == ''){
        setErrorFor(email, '* Ingrese el email de su cuenta');
        errors.push('vacio');
    } else if(!validateEmail(emailValue)){
        setErrorFor(email, '* Ingrese un email valido')
        errors.push('email invalido');
    } else if (emailExist(emailValue)){

    } else {
        setSuccessFor(email)
    }

    if(passwordValue == ''){
        setErrorFor(password, '* Ingrese el password de su cuenta');
        errors.push('vacio');
    } else {
        setSuccessFor(password)
    }

}

const setErrorFor = (input, message) =>{
    const inputControler = input.parentElement;
    const small = inputControler.querySelector('small');

    inputControler.className = 'input-control error';
    small.innerText = message

}

const setSuccessFor = (input) =>{
    const inputControler = input.parentElement;
    inputControler.className = 'input-control success';
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const emailExist = (emailInput) =>{
 
    fetch('http://localhost:3001/api/users/list')
    .then(response => response.json())
    .then(users => {
     
      let userFind = users.data.find(user=> user.email == emailInput);
      console.log(userFind); 
      if(userFind == undefined){
        setErrorFor(email, '* El email ingresado no se encuentra registrado')
      } 
    })
      
  };