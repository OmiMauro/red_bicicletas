var express = require('express');
var router = express.Router();
var bicicleta = require('../../controllers/api/bicicletasControllerAPI');

router.get('/', bicicleta.bicicletas_list);
router.get('/create', bicicleta.bicicletas_create);
router.post('/createPost', bicicleta.bicicletas_createP);
router.post('/update', bicicleta.bicicletas_update);
router.delete('/delete', bicicleta.bicicletas_delete);


module.exports = router;