//**requires */
const express = require('express')
const router = express.Router()

//**Controller require */
const APIController = require('../../controllers/api/tablasSecundariasController')

//**GET de todas las unidades */
router.get('/unidad',APIController.gettingAllUnits)
//**GET de todos los estatus */
router.get('/estatus',APIController.gettingAllEstatus)
//**GET de todos los expositions */
router.get('/expositions', APIController.gettingAllExpositions)
//**GET de todos los payments*/
router.get('/payments', APIController.gettingAllPayments)
//**GET de todos los roles*/
router.get('/orders', APIController.gettingAllRoles)
//**GET de todos los categories*/
router.get('/categories', APIController.gettingAllCategories)
module.exports = router;