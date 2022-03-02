const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/',listController.list)

module.exports = router