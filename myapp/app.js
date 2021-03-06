/* cookies */
/* Dependencias o modulos */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('../myapp/db/db');
var passport = require('./config/passport');
var session = require('express-session');

/* Routes */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var biciRouter = require('./routes/bicicletas');
var biciRouterAPI = require('./routes/api/bicicletasRoutes');
var usersAPI = require('./routes/api/usuarioRoutes');
var tokenRoute = require('./routes/api/tokenRoutes');
var loginRoute = require('./routes/login');
/* Un objeto Store para almacenar una sesion del usuario en BD */

const store = new session.MemoryStore;

var app = express();

app.use(session({
    cookie: { maxAge: 240 * 60 * 60 * 100 }, // 10 dias
    store: store,
    saveUninitialized: true,
    resave: 'true',
    secret: 'red_bicis_!!!***!!!'
}));
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', logeddIn, usersRouter);
app.use('/bicicletas', logeddIn, biciRouter);
app.use('/api/bicicletas/', biciRouterAPI);
app.use('/usuarios', logeddIn, usersAPI);
app.use('/token', tokenRoute);


app.use('/login/', loginRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});

function logeddIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        console.log('usuario sin loguearse\n');
        res.redirect('/login');
    }
}
module.exports = app;