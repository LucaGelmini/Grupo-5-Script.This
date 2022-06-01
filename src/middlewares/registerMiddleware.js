const {body} = require('express-validator');
const path = require('path');

const usersMiddleware = [
body('fullname')
                .notEmpty().withMessage('* Ingrese su nombre y apellido completo').bail()
                .isLength({min: 2}).withMessage('* Ingreso al menos 2 caracteres'),
body('username')
                .notEmpty().withMessage('* Ingrese su nombre de usuario'),
body('email')
                .notEmpty().withMessage('* Ingrese su correo electrónico').bail()
                .isEmail().withMessage('* Ingrese un correo electrónico válido'),
body('brithdate')
                .notEmpty().withMessage('* Ingrese su fecha de nacimiento').bail()
                .isDate().withMessage('* Ingrese una fecha válida'),
body('adress')
                .notEmpty().withMessage('* Ingrese domicilio completo (calle, N°, piso, depto., provincia y localidad)'),
body('postalcode')
                .notEmpty().withMessage('* Ingrese su código postal').bail()
                .isNumeric().withMessage('* Ingrese un telefono valor numerico'),
body('phone')
                .notEmpty().withMessage('* Ingrese su numero de telefono celular').bail()
                .isNumeric().withMessage('* Ingrese un telefono válido'),
body('role_id')
                    .notEmpty().withMessage('* Ingrese su rol como usuario'),
body('password')
                .notEmpty().withMessage('* Defina una contraseña').bail()
                .isLength({min: 8}).withMessage('* Su contraseña debe tener al menos 8 caracteres').bail()
                .isStrongPassword().withMessage('* Defina una contraseña fuerte'),
body('confirmPassword')
                .notEmpty().withMessage('* Repita la contraseña ingresada anteriormente'),
body('userfile')
                .custom((value, {req})=>{
                    let file = req.file;
                    let extensionAccepted = ['.jpg', '.jpeg' , '.png', '.gif'];
                    if(!file){
                        throw new Error('* Debes subir una imagen') //si no te envian un file --> mostrar mensaje
                    } else {
                        let extensionFile = path.extname(file.originalname);
                        if(!extensionAccepted.includes(extensionFile)){
                            throw new Error(`Las extensiones de archivos permitidas son: ${extensionAccepted.join(', ')}`);
                        }
                    }
                    return true
                })
]

module.exports = usersMiddleware;