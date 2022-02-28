const express = require('express');
const router = express.Router();
const productCartController = require('../controllers/productCartController');

router.get('/', productCartController.cart)

module.exports = router