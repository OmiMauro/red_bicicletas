var express = require('express');
var router = express.Router();
var bicicleta = require('../../controllers/api/bicicletasControllerAPI');

router.get('/', bicicleta.bicicletas_list);
router.get('/crear', bicicleta.bicicletas_crearView);
router.post('/create', bicicleta.bicicletas_create);
router.post('/update', bicicleta.bicicletas_update);
router.delete('/delete', bicicleta.bicicletas_delete);


module.exports = router;