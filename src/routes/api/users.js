const express = require('express');
const router = express.Router();

const usersController = require('../../controllers/api/usersController');


 

router.get('/users/list',usersController.list);
router.get('/users',usersController.pagesList);
router.get('/user/:id',usersController.detail);
router.post('/user', usersController.find);


module.exports = router;