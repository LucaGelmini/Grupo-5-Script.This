//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const validateUnits = require('../middlewares/unitsMiddleware')


//**********Controller require */
const unitsMeasureController = require('../controllers/unitsMeasureController')


//******GET de todas las unidades************ */

router.get('/', unitsMeasureController.getAll)

// ************ GET unidades********/
router.get('/unidad',unitsMeasureController.gettingAll)

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