var Usuario = require('../../models/usuario');
var Token = require('../../models/token');


module.exports = {
    validarToken: function(req, res, next) {
        Token.findOne({ token: req.params.token }, function(err, token) {
            if (!token) {
                return res.status(400).send({
                    type: 'not-verified',
                    msg: 'No se encontro el usuario con ese Token. Intente solicitar nuevamente un Token'
                });
            }
            Usuario.findById(token._userId, function(err, usuario) {
                if (!usuario) {
                    return res.status(400).send({
                        msg: 'No se encontro el usuario con ese Token.'
                    });
                }
                if (usuario.verificado) {
                    return res.redirect('/usuarios/index');
                }
                usuario.verificado = true;
                usuario.save(function(err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message });
                    }
                    return res.redirect('/usuarios/index');
                });
                res.redirect('/usuarios/index');
            });
        });
    }
};




/* 




var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {
    confirmationGet: function(req, res, nest) {
        Token.findOne({ token: b6fbc1ab1e0d79692a20adeccf827709req.params.token }, function(err, token) {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No encontramos un usuario con este token. Quizá haya expirado y debas solicitar uno nuevo.' });
            Usuario.findById(token._userId, function(err, usuario) {
                if (!usuario) return res.status(400).send({ msg: 'No encontramos un usuario con este token' });
                if (usuario.verificado) return res.redirect('/usuarios');
                usuario.verificado = true;
                usuario.save(function(err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.redirect('/');
                });
            });
        });
    },
}; */