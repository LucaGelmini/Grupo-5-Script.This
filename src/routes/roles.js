//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const paymentsMiddleware = require('../middlewares/paymentsMiddleware')


//**********Controller require */
const rolesController = require('../controllers/rolesController')


//******GET de todos los productos en dicha unidad************ */

router.get('/', rolesController.getAll)

///**************** */ crear*************************

router.get('/crear', rolesController.crear)
router.post('/crear',paymentsMiddleware, rolesController.creacion)

//*********Eliminar*********** */

router.get('/eliminar', rolesController.eliminar)
router.post('/eliminar/:id',paymentsMiddleware, rolesController.eliminacion)

//**********editar********* */

router.get('/editar/:id', rolesController.editar)
router.post('/editar/:id', rolesController.update)
module.exports = router;