const express = require('express');
const router = express.Router();

const cartOrderController = require('../../controllers/api/cartOrderController');



router.post('/', cartOrderController.prueba);
router.get('/', cartOrderController.list)

module.exports = router;