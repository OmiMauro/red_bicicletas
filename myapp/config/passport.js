//http://www.passportjs.org/packages/passport-local/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
    function(email, password, done) {
        Usuario.findOne({ email: email }, (err, usuario) => {
            if (err) {
                return done(err);
            }
            if (!usuario) {
                return done(null, false, { message: 'El email no existe o es incorrecto!' });
            }
            if (!usuario.validPassword(password)) {
                return done(null, false, { message: 'Contrasena incorrecta!' });
            }
            return done(null, usuario);
        });

    }
));


passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
    Usuario.findById(id, (err, usuario) => {
        cb(err, usuario);
    });
});
module.exports = passport;