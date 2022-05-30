import { printingErrors } from "./printingErrors.js";

window.addEventListener('load',()=>{
    fetch('http://localhost:3001/api/secundariasestatus')
    .then(res => {         
            return res.json()
        })
        .then(respuesta =>{            
            return printingErrors(respuesta)
        })
        .catch(error => console.log(`Se presenta el siguiente error: ${error}`))
})