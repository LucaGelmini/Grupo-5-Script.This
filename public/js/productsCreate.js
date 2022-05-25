document.addEventListener("DOMContentLoaded", function(){
    //este evento espera a que se renderice lo esencial de
    //la pagina para cargar el js
    console.log('validacion Front')

    let inputs = document.querySelectorAll('.create-product-form > input, .create-product-form > select');
    let submit = document.querySelector('.create-product-button');
    let form = document.querySelector('.create-product-form');
    let formErrorsList = document.createElement("div");
    formErrorsList.classList.add("form-errors-list");
    form.appendChild(formErrorsList);
    
    

    submit.onclick = event =>{
        
        let errors = [];
        inputs.forEach(input =>{
            switch (input.name){

                case 'name':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese un nombre');
                    }else{
                        input.classList.remove('form-input-error');
                    };
                    break;
                case 'unit_mensure':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese un unidad de medida');
                    }else{
                        input.classList.remove('form-input-error');
                    };
                    break;
                case 'mensure_value':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese un unidad de medida');
                        break;
                    };
                    if(!Number(input.value)){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese una cantidad por unidad válida');
                        break;
                    };
                    if(input.value != ''){
                        input.classList.remove('form-input-error');
                        break;
                    };
                case 'price':
                    console.log(input.value)
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese un precio válido');
                        break;
                    };
                    if(input.value != ''){
                        input.classList.remove('form-input-error');
                        break;
                    };                     
                case 'discount':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese un valor de descuento válido');
                        break;
                    };

                    if(input.value != ''){
                        input.classList.remove('form-input-error');
                        break;
                    };
                case 'category':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese una categoría');
                    }else{
                        input.classList.remove('form-input-error');
                    };
                    break;
                case 'exposicion':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese un tipo de exposición');
                    }else{
                        input.classList.remove('form-input-error');
                    };
                    break;
                case 'description':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese una descripción');
                    }else{
                        input.classList.remove('form-input-error');
                    };
                    break;
                case 'img':
                    if(input.value === ''){
                        input.classList.add('form-input-error');
                        errors.push('Ingrese una imagen');
                    }else{
                        input.classList.remove('form-input-error');
                    };
                    break;

            }
        });
        if (errors.length != 0){
            event.preventDefault();
            formErrorsList.innerHTML = `
                <ul>
                    ${errors.map(error => `<li>${error}</li>`)}
                </ul>
            `;
            console.log(errors)
        }else{
            formErrorsList.innerHTML = ''
            event.preventDefault();
            alert('sin errores')
        }
    };

})