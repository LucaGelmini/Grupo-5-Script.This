//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const validateUnits = require('../middlewares/unitsMiddleware')


//**********Controller require */
const estatus = require('../controllers/estatusController')


//******GET de todos los productos en dicha unidad************ */

router.get('/', estatus.getAll)
///**************** */ crear*************************

router.get('/crear', estatus.crear)
router.post('/crear',validateUnits, estatus.creacion)

// //*********Eliminar*********** */



router.post('/eliminar/:id', estatus.eliminacion)

// //**********editar********* */

router.get('/editar/:id', estatus.editar)
router.post('/editar/:id', estatus.edicion)
module.exports = router;