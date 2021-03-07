var Usuario = require('../../models/usuario');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: function(req, res, next) {
        Usuario.findOne({ email: req.body.email }, (err, usuario) => {
            if (err) {
                next(err)
            } else {
                if (usuario === null) {
                    return res.status(401).json({ status: "error", data: null, info: "datos no validos" });
                } else {
                    if (bcrypt.compareSync(req.body.password, usuario.password)) {
                        var token = jwt.sign({ id: usuario._id }, req.app.get('secretKey'), { expiresIn: '10d' });
                        res.status(200).json({
                            message: 'Usuario encontrado.',
                            data: {
                                usuario: usuario,
                                token: token
                            }
                        });
                    }
                }
            }
        });
    },
    forgotPassword: function(req, res, next) {
        Usuario.findOne({ email: req.body.email }, (err, usuario) => {
            if (err) {
                next(err);
            } else {
                if (usuario === null) {
                    return res.status(401).json({ data: null, status: 'error', message: 'No se encontro el email' });
                } else {
                    usuario.resetPassword(function(err) {
                        if (err) {
                            return next(err);
                        } else {
                            res.status(200).json({
                                message: 'Se envio un correo electronico al email ingresado.',
                                data: usuario,
                            });
                        }
                    });
                }
            }
        })
    }
}