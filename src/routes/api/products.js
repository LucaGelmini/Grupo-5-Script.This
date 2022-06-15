//**requires */
const express = require('express')
const router = express.Router()

//**Controller require */
const productsController = require('../../controllers/api/productsController')

//**GET de todas las unidades */
router.get('/', productsController.findAll)
router.get('/most-expensives', productsController.moreExpensive)
router.get('/best-sellers',productsController.bestSellers)


module.exports = router;