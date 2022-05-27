export function printingErrors(resultado, llave){
  
    let inputCreation = document.querySelector('.input-texto')
    let listaErrores = document.querySelector('.listaErrores')    
    inputCreation.addEventListener('blur',e=>{
      let caracteresNoValidos = /[^a-z]/gi
      let validacionCaracter=caracteresNoValidos.test(e.target.value)    
      if(e.target.value ==''){
        listaErrores.innerHTML = '<li style="color:red; font-size: 16px; "> Debes agregar algún item</li>'
        inputCreation.style.border = '1px solid red'              
      }else{       
        if(validacionCaracter){         
          listaErrores.innerHTML = '<li style="color:red; font-size: 16px; "> No son permitidos caracteres especiales ni números</li>'
          inputCreation.style.border = '1px solid red'
        }        
        else{ 
          listaErrores.innerHTML=''
          inputCreation.style.border = 'none'   
          let findUnit = resultado.data.find(unit => {  
            if(llave) return e.target.value==unit[llave]
            
              return e.target.value == unit.type
          })
          if(findUnit != undefined){
            listaErrores.innerHTML ='<li style="color:red ; font-size:16px;">Ya existe este elemento en la base de datos</li>'
            inputCreation.style.border = '1px solid red'
          }

  
        }  
      }  
        
      


    })
}
 