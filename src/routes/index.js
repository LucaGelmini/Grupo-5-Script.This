const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');




router.get('/',/*indexController.index*/(req,res)=>res.send('HOLA'))

// router.post('/',indexController.search)

//Para probar los models y etc
router.get('/testdb', indexController.testDb)


 

module.exports = router