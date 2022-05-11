//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const validateUnits = require('../middlewares/unitsMiddleware')


//**********Controller require */
const unitsMeasureController = require('../controllers/unitsMeasureController')


//******GET de todos los productos en dicha unidad************ */

router.get('/', unitsMeasureController.getAll)

///**************** */ crear*************************

router.get('/crear', unitsMeasureController.crear)
router.post('/crear',validateUnits, unitsMeasureController.creacion)

//*********Eliminar*********** */

router.get('/eliminar', unitsMeasureController.eliminar)

router.post('/eliminar/:id', unitsMeasureController.eliminacion)

//**********editar********* */

router.get('/editar/:id', unitsMeasureController.editar)
router.post('/editar/:id', unitsMeasureController.edicion)
module.exports = router;