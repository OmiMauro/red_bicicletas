var Usuario = require('../../models/usuario');

beforeEach(function(done) {
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
    done();
});
/* 
afterEach(function(done) {
    Usuario.deleteMany({}, function(err, success) {
        if (err) {
            console.log('No se puede borrar todo.\n' + err);
        }
        done();
    });
}); */
describe('Modelo de Usuario.', () => {
    describe('Se crea un usuario.', () => {
        it('Se creo el usuario y se persistio.', (done) => {
            var manu = new Usuario({ nombre: 'Emanuel', apellido: 'Ominuka', DNI: '41503896' });
            manu.save();
            done();
        });
    });
    describe('Se lista el usuario Manu.', () => {
        it('Se encontro el usuari.', (done) => {
            var user = Usuario.allUsers({}, function(err, success) {
                expect(success.length).toBe(1);
                console.log(success);
                done();
            })
        });
    });
});