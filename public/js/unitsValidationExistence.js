import {printingErrors} from './printingErrors.js'

window.addEventListener('load',()=>{
  fetch('http://localhost:3001/units/unidad')
  .then(respuesta => respuesta.json())
  .then(resultado => {  
         
        printingErrors(resultado) 
  })  
})