const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detailController')

router.get('/', detailController.detail)

module.exports = router