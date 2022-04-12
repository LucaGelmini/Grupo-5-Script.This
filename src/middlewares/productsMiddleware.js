const { body } = require("express-validator");
const path = require('path');
 
 

const validateProducts = [
    body('name')
          .notEmpty().withMessage('* Debes completar el nombre del producto'),
    body('unit_mensure')
          .notEmpty().withMessage('* Debes completar la unidad de medida del producto'),
    body('mensure_value')
          .notEmpty().withMessage('* Debes completar el valor de la unidad de medida definida anteriormente'),
    body('price')
          .notEmpty().withMessage('* Debe definir el precio del producto'),
    body('discount')
          .notEmpty().withMessage('* Debes definir el descuento para el producto'),
    body('category')
          .notEmpty().withMessage('* Debes seleccionar una category'),     
    body('exposicion')
          .notEmpty().withMessage('* Debes seleccionar una exposición'),
    body('description')
          .notEmpty().withMessage('* Debes detallar una breve descripción del producto'),        
    body('img').custom((value,{req})=>{
        let file = req.file;
        let extensionAccepted = ['.jpg', '.png', '.gif']
        
        if(!file){
            
            throw new Error('* Debes subir una imagen') //si no te envian un file --> mostrar mensaje
        } else { 
            let extensionFile = path.extname(file.originalname)  // si te adjunta un file --> capturar la extension del archivo
            if(!extensionAccepted.includes(extensionFile)) { // validar la extension deñ archivo subido
            throw new Error(`Las extensiones de archivos permitidas son: ${extensionAccepted.join(', ')}`)
            }
        }
        return true;
    }) 
     
]

module.exports = validateProducts