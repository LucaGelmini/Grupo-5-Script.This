const {body} = require('express-validator')
const path = require('path')


const unitsMiddleware = [
    body('unidad').notEmpty().withMessage('Ingrese algo al formuluario antes de enviar').bail()
                  .matches('^[a-zA-Z]*$').withMessage('No puede contener números ni caracteres especiales')
                  
                
]
module.exports = unitsMiddleware;