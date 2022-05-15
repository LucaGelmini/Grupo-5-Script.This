const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const registerMiddleware = require('../middlewares/registerMiddleware');
const loginMiddleware = require('../middlewares/loginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


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

router.get('/login',guestMiddleware ,usersController.loginView);
router.post('/login',loginMiddleware,usersController.login);


router.get('/register',guestMiddleware ,usersController.registerView);
router.post('/register',upload.single('userfile'), registerMiddleware, usersController.register);


router.get('/profile',authMiddleware ,usersController.profile);
router.get('/profile/edit',authMiddleware ,usersController.edit);
router.put('/profile/edit',authMiddleware ,usersController.update);

router.get('/logout', usersController.logout);

// router.get('/', usersController.users);

// router.post('/', usersController.editUser)

module.exports = router;