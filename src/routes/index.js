const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const indexController = require('../controllers/indexController');


// Configurar el multer: donde guardar las imagenes y su nombre
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/img/users')
    },
    filename: (req, file, cb)=> {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

router.get('/',indexController.index)

router.get('/login',indexController.loginView)

router.post('/',indexController.login)

router.get('/register',indexController.registerView)

router.post('/',upload.single('img'),indexController.register)

router.post('/',indexController.search)


 

module.exports = router