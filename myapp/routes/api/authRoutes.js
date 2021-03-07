var express = require('express');
var router = express.Router();
var login = require('../../controllers/api/authControllerAPI');

router.post('/authenticate', login.authenticate);
router.post('/forgotPassword', login.forgotPassword);

module.exports = router;