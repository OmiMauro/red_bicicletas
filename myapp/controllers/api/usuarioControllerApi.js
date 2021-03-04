var mongoose = require('mongoose');
var request = require('request');
var Usuario = require('../../models/usuario');

exports.usuario_list = function(req, res) {
    Usuario.find({}, function(err, usuarios) {
        return res.status(200).json({
            usuarios: usuarios
        });
    });
};

exports.usuario_create = function(req, res) {
    return res.render('usuarios/create');
};

exports.usuario_createPost = function(req, res, next) {

};
exports.usuario_createReserva = function(req, res) {

};

/* 
router.get('/', usuario.usuario_list);
router.get('/create', usuario.usuario_create);
router.post('/create',usuario.usuario_create_Post);
router.get('/reservar',usuario.usuario_createReserva);
router.get('/:id/update', usuario.usuario_update);
router.post('/:id/update',usuario.usuario_update_Post);
router.delete('/:id/delete', usuario.usuario_delete);
 */