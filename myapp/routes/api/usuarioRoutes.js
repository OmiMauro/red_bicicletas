var express = require('express');
var router = express.Router();
var usuarioRoutes = require('../../controllers/usuario');

router.get('/', usuarioRoutes.usuario_list);
router.get('/create', usuarioRoutes.usuario_create);
router.post('/create', usuarioRoutes.usuario_create_Post);
router.get('/reservar', usuarioRoutes.usuario_createReserva);
router.get('/:id/update', usuarioRoutes.usuario_update);
router.post('/:id/update', usuarioRoutes.usuario_update_Post);
router.post('/:id/delete', usuarioRoutes.usuario_delete);

module.exports = router;