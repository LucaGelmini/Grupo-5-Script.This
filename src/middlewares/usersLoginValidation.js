const {body} = require('express-validator');
const path = require('path');

const usersLoginValidation = [

body('username')
                .notEmpty().withMessage('* Ingrese su nombre de usuario'),

body('password')
                .notEmpty().withMessage('* Defina una contraseña').bail(),
]


module.exports = usersLoginValidation;