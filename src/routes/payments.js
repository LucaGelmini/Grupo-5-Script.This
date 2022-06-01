//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const paymentsMiddleware = require('../middlewares/paymentsMiddleware')


//**********Controller require */
const paymentsController = require('../controllers/paymentsController')


//******GET de todos los productos en dicha unidad************ */

router.get('/', paymentsController.getAll)

///**************** */ crear*************************

router.get('/crear', paymentsController.crear)
router.post('/crear',paymentsMiddleware, paymentsController.creacion)

//*********Eliminar*********** */

router.get('/eliminar', paymentsController.eliminar)
router.post('/eliminar/:id',paymentsMiddleware, paymentsController.eliminacion)

//**********editar********* */

router.get('/editar/:id', paymentsController.editar)
router.post('/editar/:id', paymentsController.update)
module.exports = router;