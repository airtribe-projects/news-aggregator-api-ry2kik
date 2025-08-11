const express = require('express');
const { signupController, loginController, getUsers } = require('../Controller/app.controller.js');
const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signupController);
router.post('/login', loginController);


module.exports = router;