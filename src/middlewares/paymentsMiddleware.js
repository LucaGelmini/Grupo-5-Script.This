const {body} = require('express-validator')
const path = require('path')


const paymentsMiddleware = [
    body('payment').notEmpty().withMessage('Ingrese un método de pago').bail().isLength({min:2}).withMessage('El método de pago tiene que ser mayor a 2 caracteres'), 
    body('roles').notEmpty().withMessage('Ingrese un rol').bail().isLength({min:3}).withMessage('El rol debe ser mayor a 3 caracteres'),
    body('categories').notEmpty().withMessage('Ingrese una categoria').bail().isLength({min:4}).withMessage('La categoria debe ser mayor a 4 caracteres')
]
module.exports = paymentsMiddleware;