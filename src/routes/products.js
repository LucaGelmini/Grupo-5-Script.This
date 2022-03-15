// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');

// Configurar el multer: donde guardar las imagenes y su nombre

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'public/img/products')
    },
    filename: (req, file, cb)=>{
        cb(null,file.fieldname + '-' + DateNow() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.allProducts);

/*** GET ONE PRODUCT ***/ 
router.get('/detail-:id', productsController.detail);


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/',upload.single('img'),productsController.store);


/*** EDIT ONE PRODUCT ***/ 

router.get('/edit/:id',productsController.edit);
router.put('/edit/:id',productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id',productsController.delete);





module.exports = router