//https://www.npmjs.com/package/bcrypt
//npm install bcrypt --save
//npm install mongoose-unique-validator --save
var mongose = require('mongoose');
var Reserva = require('../models/reserva');
var Schema = mongose.Schema;
var saltRounds = 10;
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var validarEmail = function(email) {
    var re = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
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
        match: ["^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"],
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

usuarioSchema.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta }, cb);
    console.log(reserva);
    reserva.save(cb);
};


module.exports = mongose.model('Usuario', usuarioSchema);