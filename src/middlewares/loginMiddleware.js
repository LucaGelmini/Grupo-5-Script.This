const {body} = require('express-validator');
 

const usersLoginValidation = [

body('email')
                .notEmpty().withMessage('* Ingrese su correo electrónico').bail()
                .isEmail().withMessage('* Ingrese un correo electrónico válido'),

body('password')
                .notEmpty().withMessage('* Ingese su contraseña').bail(),
]


module.exports = usersLoginValidation;