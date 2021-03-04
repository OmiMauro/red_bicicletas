var express = require('express');
var router = express.Router();
var tokenController = require('../../controllers/api/tokenControllerAPI');

router.post('/confirmation/:token', tokenController.validarToken);

module.exports = router;