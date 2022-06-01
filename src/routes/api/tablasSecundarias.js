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


module.exports = router;