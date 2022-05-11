//****** requires */
const express = require('express')
const router = express.Router()
const path = require('path')
const paymentsMiddleware = require('../middlewares/paymentsMiddleware')


//**********Controller require */
const categoriesController = require('../controllers/categoriesController')


//******GET de todos los productos en dicha unidad************ */

router.get('/', categoriesController.getAll)

///**************** */ crear*************************

router.get('/crear', categoriesController.crear)
router.post('/crear',paymentsMiddleware, categoriesController.creacion)

//*********Eliminar*********** */

router.get('/eliminar', categoriesController.eliminar)
router.post('/eliminar',paymentsMiddleware, categoriesController.eliminacion)

//**********editar********* */

router.get('/editar/:id', categoriesController.editar)
router.post('/editar/:id', categoriesController.update)
module.exports = router;