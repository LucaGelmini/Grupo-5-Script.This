//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const validateUnits = require('../middlewares/unitsMiddleware')


//**********Controller require */
const exposition = require('../controllers/expositionController')


//******GET de todos los productos en dicha unidad************ */

router.get('/', exposition.getAll)
//** Getting all expositions for validations */
router.get('/expositions',exposition.gettingAll)



///**************** */ crear*************************

router.get('/crear', exposition.crear)
router.post('/crear',validateUnits, exposition.creacion)

// // //*********Eliminar*********** */



router.post('/eliminar/:id', exposition.eliminacion)

// // //**********editar********* */

router.get('/editar/:id', exposition.editar)
router.post('/editar/:id', exposition.edicion)
module.exports = router;