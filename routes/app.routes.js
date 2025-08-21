const express = require('express');
const router = express.Router();
const { signupController, loginController, userPreferences, updatePreferences } = require('../Controller/app.controller.js');
const userAuth = require('../middleware/auth.js');


router.get('/preferences', userAuth, userPreferences);
router.post('/signup', signupController);
router.post('/login', loginController);
router.put('/preferences', userAuth, updatePreferences);


module.exports = router;