 
// const inputs = document.querySelectorAll('.formulario-register input');
const inputControl = document.getElementById('input-control');
// const small = document.getElementById('small');

const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const brithdate = document.getElementById('brithdate');
const adress = document.getElementById('adress');
const postalcode = document.getElementById('postalcode');
const phone = document.getElementById('phone');
const userfile = document.getElementById('userfile');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const formularioRegister = document.querySelector('.formulario-register');



// import fetch from 'node-fetch';

const errors = [];
  
window.addEventListener('load', function(){
  formularioRegister.addEventListener('submit', function(e){
    e.preventDefault();

    errors.splice(0,errors.length);
    console.log(errors);
    checkInputs();

    if(errors.length < 1){
      formularioRegister.submit()
    }
})  
})


const checkInputs = () =>{
const fullnameValue = fullname.value.trim(); 
const usernameValue = username.value.trim(); 
const emailValue =  email.value.trim();
const brithdateValue = brithdate.value.trim();
const adressValue = adress.value.trim();
const postalcodeValue = postalcode.value.trim();
const phoneValue = phone.value.trim();
const userfileValue =  userfile.value;
const passwordValue = password.value.trim();
const confirmPasswordValue =  confirmPassword.value.trim();


const onlyText = /^[A-Za-z\s]+$/; /^\s*$/ 
    //Check de campo fullname
   if(fullnameValue == ''){
     setErrorFor(fullname, '* El campo no puede estar vacio');
     errors.push('vacio');
   } else if(!fullnameValue.match(onlyText)) {
    setErrorFor(fullname, '* El nombre completo debe ser formato texto');
    errors.push('textFormatOnly');
  } else if(fullnameValue.length < 2){
    setErrorFor(fullname, '* El nombre completo debe tener al menos 2 caracteres');
    errors.push('2caracteres');
  } else {
    setSuccessFor(fullname);
  }

     //Check de campo username
     if(usernameValue == ''){
      setErrorFor(username, '* El campo no puede estar vacio');
      errors.push('vacio');
    } else if(usernameValue.length < 2){
     setErrorFor(username, '* El nombre completo debe tener al menos 2 caracteres');
     errors.push('2caracteres');
   } else {
     setSuccessFor(username);
   }

     //Check de campo email
     if(emailValue == ''){
      setErrorFor(email, '* El campo no puede estar vacio');
      errors.push('vacio');
    } else if(!validateEmail(emailValue)){
     setErrorFor(email, '* Ingrese un email valido')
     errors.push('invalidEmail');
   }  else if (emailExist(emailValue)) {
     
   } else {
     setSuccessFor(email);
   }

      //Check de campo brithdate
      if(!brithdateValue){
        setErrorFor(brithdate, '* El campo no puede estar vacio');
        errors.push('vacio');
      }  else {
       setSuccessFor(brithdate);
     }

    //Check de campo adress
    if(adressValue == ''){
      setErrorFor(adress, '* El campo no puede estar vacio');
      errors.push('vacio');
    }  else {
     setSuccessFor(adress);
   }

   //Check de campo postalcode
   if(postalcodeValue == ''){
    setErrorFor(postalcode, '* El campo no puede estar vacio');
    errors.push('vacio');
    } else {
   setSuccessFor(postalcode);
 }

  //Check de campo phone
  if(phoneValue == ''){
    setErrorFor(phone, '* El campo no puede estar vacio');
    errors.push('vacio');
  } else {
   setSuccessFor(phone);
 }

 

const passParam = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
 //Check que el campo password sea strong password
 if(passwordValue == ''){
  setErrorFor(password, '* El campo no puede estar vacio');
  errors.push('vacio');
} else if((!passwordValue.match(passParam))){
   setErrorFor(password, '* La password debe tener al menos 8 caracteres, minuscula, mayuscula y numero');
   errors.push('strongPassword');
 } else {
   setSuccessFor(password);
 }

//Check que el campo ConfirmPassword igual a password
if(confirmPasswordValue == ''){
    setErrorFor(confirmPassword, '* El campo no puede estar vacio');
    errors.push('vacio');
} else if(!(confirmPasswordValue == passwordValue)){
    setErrorFor(confirmPassword, '* Deben coincidir ambas contraseñas');
    errors.push('confirmPassword');
  } else {
     setSuccessFor(confirmPassword);
  }

//Check que el campo imagen extensiones
  const allowedExtensions = 
          /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if(!userfileValue){
    setErrorFor(userfile, '* Debe adjuntar una imagen');
    errors.push('vacio');
  }  else if (!allowedExtensions.exec(userfileValue)) {
      setErrorFor(userfile, '* Las extensiones permitidas son JPG, JPEG, PNG, GIF');
      errors.push('userFileExtension');
      userfile.value = '';
      return false;
} else {
  setSuccessFor(userfile);
}

};

const setErrorFor = (input, message) =>{
    const inputControl = input.parentElement;
    const small = inputControl.querySelector('small');

   
    inputControl.className = 'input-control error';
    small.innerText = message;
};

const setSuccessFor = (input) =>{
    const inputControl = input.parentElement;
    inputControl.className = 'input-control success';
};

 
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
 
const emailExist = (emailInput) =>{
 
  fetch('http://localhost:3001/api/users/list')
  .then(response => response.json())
  .then(users => {
    console.log(users)
    let userFind = users.data.find(user=> user.email == emailInput);
    console.log(userFind); 
    if(userFind != undefined){
      setErrorFor(email, '* El email ingresado ya se encuentra registrado')
    } 
  })
    
};  

 
 