//http://www.passportjs.org/packages/passport-local/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy());

passport.serializeUser(function(user, cb) {
    cb(err, user.id);
});
passport.deserializeUser(function(id, cb) {
    Usuario.findById(id, (err, usuario) => {
        cb(err, usuario);
    });
});
module.exports = passport;