const {body} = require('express-validator')
const path = require('path')


const paymentsMiddleware = [
    body('payment').notEmpty().withMessage('Ingrese un método de pago'), 
    body('roles').notEmpty().withMessage('Ingrese un rol'),
    body('categories').notEmpty().withMessage('Ingrese una categoria')
]
module.exports = paymentsMiddleware;