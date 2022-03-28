const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController')
const usersMiddleware = require('../middlewares/usersMiddlewares')


// Configurar el multer: donde guardar las imagenes de perfil avatars
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/img/users')
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});


router.get('/login',usersController.loginView);

router.post('/',usersController.login);

router.get('/register', usersController.registerView);

router.post('/register',upload.single('avatar'), usersMiddleware, usersController.register);

module.exports = router;