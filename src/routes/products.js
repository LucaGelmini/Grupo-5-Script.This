// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validateProducts = require('../middlewares/productsMiddleware');

// Configurar el multer: donde guardar las imagenes y su nombre

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'public/img/products')
    },
    filename: (req, file, cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController'); 


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.allProducts);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/',upload.single('img'),validateProducts ,productsController.store);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id',productsController.edit);
router.put('/edit/:id',upload.single('img'),validateProducts ,productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id',productsController.destroy);


/*** FIND ONE PRODUCT ***/
router.post('/find', productsController.find);

module.exports = router