import {printingErrors} from './printingErrors.js'

window.addEventListener('load',()=>{
  fetch('http://localhost:3001/API/unidad')
  .then(respuesta => respuesta.json())
  .then(resultado => {          
        printingErrors(resultado) 
  })  
})