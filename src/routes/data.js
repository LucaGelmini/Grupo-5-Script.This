const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');



/*** SHOW PRODUCTS DATA JSON***/ 
router.get('/products',dataController.productsData);

/*** SHOW USERS DATA JSON***/
router.get('/users',dataController.usersData)

module.exports = router