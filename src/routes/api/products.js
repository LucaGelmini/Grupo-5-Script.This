//**requires */
const express = require('express')
const router = express.Router()

//**Controller require */
const productsController = require('../../controllers/api/products')

//**GET de todas las unidades */
router.get('/', productsController.findAll)
router.get('/more-expensive', productsController.moreExpensive)
router.get('/best-sellers',productsController.bestSellers)


module.exports = router;