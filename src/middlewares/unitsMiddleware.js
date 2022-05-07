const {body} = require('express-validator')
const path = require('path')


const unitsMiddleware = [
    body('unidad').notEmpty().withMessage('Ingrese una unidad')
]
module.exports = unitsMiddleware;