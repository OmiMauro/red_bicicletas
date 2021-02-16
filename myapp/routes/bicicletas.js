var express = require('express');
var router = express.Router();

var bicicleta = require('../controllers/bicicletas/bicicletas');
router.get('/', bicicleta.bicicletas_list);


module.exports = router;