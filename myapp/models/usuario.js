//https://www.npmjs.com/package/bcrypt
//npm install bcrypt --save
//npm install mongoose-unique-validator --save
var mongose = require('mongoose');
var Reserva = require('../models/reserva');
var Schema = mongose.Schema;
var saltRounds = 10;
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');
var Token = require('../models/token');
var mailer = require('../mailer/mailer');


var validarEmail = function(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo electronico es obligatorio'],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/],
        validate: [validarEmail, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }

});

usuarioSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});
usuarioSchema.plugin(uniqueValidator, {
    message: `El {PATH} ya existe con otro usuario.`
});

usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
usuarioSchema.methods.enviarTokenEmail = function(cb) {
    var token = new Token({ _userId: this._id, token: crypto.randomBytes(16).toString('hex') });
    var email = this.email;
    token.save(function(err) {
        if (err) { return console.error(err) }
        var optionsEmail = {
            from: 'no-reply@red-de-Bicicletas',
            to: email,
            subject: 'Verificacion de cuenta',
            text: "Hola. Por favor ingrese al siguiente enlace para validar su cuenta.\n\n" + 'http://localhost:3000' + '\/token/confirmation\/' + token.token,
        };
        mailer.sendMail(optionsEmail, (err) => {
            if (err) { return console.log(err) }
            console.log("se envio un email de bienvenida a: " + email);
        });
    });
};

/* usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta }, cb);
    console.log(reserva);
    reserva.save(cb);
}; */

usuarioSchema.methods.resetPassword = function(password) {
    var token = new Token({ _userId: this._id, token: crypto.randomBytes(16).toString('hex') });
    var email = this.email;
    token.save(function(err) {
        if (err) { return console.error(err) }
        var optionsEmail = {
            from: 'no-reply@red-de-Bicicletas',
            to: email,
            subject: 'Reseteo de contrasena',
            text: "Hola. Por favor ingrese al siguiente enlace para resetear su contraseña.\n\n" + 'http://localhost:3000' + '\/resetPassword\/' + token.token,
        };
        mailer.sendMail(optionsEmail, (err) => {
            if (err) { return console.log(err) }
            console.log("se envio un email de cambio de clave a: " + email);
        });
    });
}

module.exports = mongose.model('Usuario', usuarioSchema);