const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/auth');
const { newsPreferences } = require('../Controller/app.controller');

router.get('/news', userAuth, newsPreferences);

module.exports = router;