var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/red_bicicletas';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', () => {
    console.error('db error');

});
db.once('open', () => {
    console.log('db conectada');
});
module.exports = mongoose;