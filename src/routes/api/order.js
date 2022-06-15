const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/api/orderController');


 

router.get('/order/list',orderController.list);
router.get('/order',orderController.pagesList);
router.get('/order/:id',orderController.detail);
 


module.exports = router;