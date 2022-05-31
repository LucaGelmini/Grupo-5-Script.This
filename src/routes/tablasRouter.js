const express = require('express')
const route = express.Router()

const tablasController = require('../controllers/tablasController')


//**Mostrar las tarjetas de las tablas secundarias */
route.get('/',tablasController.getTables)

module.exports=route;