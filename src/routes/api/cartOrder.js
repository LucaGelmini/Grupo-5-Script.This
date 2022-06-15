const express = require('express');
const router = express.Router();

const cartOrderController = require('../../controllers/api/cartOrderController');


 

router.get('/cartOrder/list',cartOrderController.list);
router.get('/cartOrder',cartOrderController.pagesList);
router.get('/cartOrder/:id',cartOrderController.detail);
 


module.exports = router;