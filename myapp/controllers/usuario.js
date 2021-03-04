var Usuario = require('../models/usuario');
var Reserva = require('../models/reserva');
//const { ConsoleReporter } = require('jasmine');
module.exports = {
    usuario_list: function(req, res, next) {
        Usuario.find({}, (err, usuarios) => {
            res.render('usuarios/index', { usuarios: usuarios });
        });
    },
    usuario_create: function(req, res, next) {
        res.render('usuarios/create', { errors: {}, usuario: new Usuario() });
    },

    usuario_create_Post: function(req, res, next) {
        if (req.body.password != req.body.confirm_password) {
            res.render('usuarios/create', {
                errors: { confirm_password: { message: 'No coincide con el password ingresado' } },
                usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email, password: "", confirm_password: "" })
            });
            return;
        }
        Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        }, function(err, user) {
            if (err) {
                res.render('usuarios/create', { errors: err.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) });
            } else {
                user.enviarTokenEmail();
                console.log('se envio el correo');
                res.redirect('/usuarios');
            }
        });
    },
    usuario_createReserva: function(req, res, next) {

    },
    usuario_update: function(req, res, next) {
        Usuario.findById(req.params.id, function(err, usuario) {
            res.render('usuarios/update', { errors: {}, usuario: usuario });
        });
    },
    usuario_update_Post: function(req, res, next) {
        var update_values = { nombre: req.body.nombre };
        Usuario.findByIdAndUpdate(req.params.id, update_values, (err, user) => {
            if (err) {
                console.error(err);
            } else {
                res.redirect('/usuarios');
                return;
            }
        });
    },
    usuario_delete: function(req, res, next) {
        Usuario.findByIdAndDelete(req.params.id, function(err) {
            if (err) {
                return console.error(err);
            } else {
                console.log('se elimino el usuario');
                res.redirect('/usuarios');
                return;
            }
        });
    }
};

/*  if (err) {
                res.render('usuarios/create', {
                    errors: err.message,
                    usuario: new Usuario({
                        nombre: req.body.nombre,
                        email: req.body.email
                    })
                }) */