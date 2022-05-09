const {body} = require('express-validator')
const path = require('path')


const unitsMiddleware = [
    body('payment').notEmpty().withMessage('Ingrese un método de pago')
]
module.exports = unitsMiddleware;