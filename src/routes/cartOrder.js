const express = require('express');
const router = express.Router();
 
 
const cartOrderController = require('../controllers/cartOrderController');
 

router.get('/' ,cartOrderController.cart);
 

module.exports = router;