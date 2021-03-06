var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
const Token = require('../models/token');
const Usuario = require('../models/usuario');

router.get('/', function(req, res, next) {
    res.render('login/login');
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, usuario, info) {
        if (err) return next(err);
        if (!usuario) {
            return res.render('login/login', { info })
        };
        req.logIn(usuario, function(err) {
            if (err) { return next(err); }
            console.log('usuario logued. Redirect.\n');
            return res.redirect('../');
        });
    })(req, res, next);
});



router.get('/forgotPassword', (req, res, next) => {
    res.render('/forgotPassword');
});

router.post('/forgotPassword', function(req, res) {
    Usuario.findOne({ email: req.body.email }, function(err, usuario) {
        if (!usuario) return res.render('login/forgotPassword', { info: { message: 'No existe el usuario' } });
        usuario.resetPassword(function(err) {
            if (err) return next(err);
        });
        res.render('login/forgotPasswordMessage');
    });
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.post('/resetPassword', (req, res, next) => {
    Usuario.findOne({ email: req.body.email }, function(err, usuario) {
        if (!usurio) {
            return res.render('/login/forgotPassword', { info: { message: 'No existe un usuario con el email ingresado' } });
        }
        usuario.resetPassword(function(err) {
            if (err) return next(err);
        });
        res.render('/login/forgotPasswordMessage');
    });

});

router.post('/resetPassword/:token', (req, res, next) => {
    Token.findOne({ token: req.params.token }, function(err, token) {
        if (!token) {
            return res.status(400).send({ type: 'not-verified', msg: 'no existe el token' })
        }
    });
    Usuario.findById({ _id: token._userId }, (err, usuario) => {
        if (!usuario) {
            return res.status(400).send({ type: 'not-verified', msg: 'NO existe el token asociado a un usuario' })
        }
        res.render('login/resetPassword', { errors: {}, usuario: usuario });
    });
});
module.exports = router;