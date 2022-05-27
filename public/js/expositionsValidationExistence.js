import { printingErrors } from "./printingErrors.js";

window.addEventListener('load',()=>{
    fetch('http://localhost:3001/expositions/expositions')
        .then(respuesta => {
            return respuesta.json()
        })
        .then(data =>  printingErrors(data,'name'))
        .catch(console.log)
})