const {body} = require('express-validator');
 

const usersLoginValidation = [

body('email')
                .notEmpty().withMessage('* Ingrese su correo electrónico'),

body('password')
                .notEmpty().withMessage('* Defina una contraseña').bail(),
]


module.exports = usersLoginValidation;