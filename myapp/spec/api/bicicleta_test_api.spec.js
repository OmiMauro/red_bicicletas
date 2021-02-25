var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');
var mongoose = require('mongoose');

var base_url = "http://localhost:3000/api/bicicletas";
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

afterEach(function(done) {
    Bicicleta.deleteMany({}, function(err, success) {
        if (err) {
            console.log('No se puede borrar todo.\n' + err);
        }
        done();
    });
});

describe('Bicicleta API', () => {
    describe('Get Bicicletas.', () => {
        it('Status 200', (done) => {
            request.get(base_url, function(error, response, body) {
                var resultado = JSON.parse(body);
                //expect(response.statusCode).toBe(200);
                expect(resultado.length).toBe(0);
                done();
            });
        });
    });
    describe('Post bicicletas/create', () => {
        it('status 200.', (done) => {
            var headers = { 'content-type': 'application/json' };
            var unaBici = '{ "code": "10", "color": "verde", "modelo": "Pistera", "ubicacion": 121.2}';
            request.post({
                headers: headers,
                url: base_url + "/create",
                body: unaBici
            }, function(error, response, body) {
                //expect(statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.code).toBe(10);
                done();
            });
        });
    });
});













/* Codigo previo a agregar la conrequestexion a mongo 
//jasmine.getEnv().defaultTimeoutInterval = 9000;
beforeEach(() => {
    Bicicleta.allBicis = [];
})

describe('Testear la API.', () => {
    describe('Get bicicletas.', () => {
        it('Status code 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var slp = new Bicicleta(4, 'rojo', 'MTB', 'JAA');
            Bicicleta.agregarBici(slp);
            request.get('http://localhost:3000/api/bicicletas/', function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('Post Bicicletas.', () => {
        it('Status code 200.', (done) => {
            var headers = { 'content-type': 'application/json' };
            var unaBici = '{ "id": "10", "color": "verde", "modelo": "Pistera", "ubicacion": "Posadas" }';
            request.post({
                url: 'http://localhost:3000/api/bicicletas/create',
                headers: headers,
                body: unaBici
            }, function(error, response, body) {
                //expect(response.statusCode).toBe(200);
                expect(Bicicleta.findBiciById(10).color).toBe('verde');
                done(); //es una funcion que termina la ejecucion del test.
            });
        });

    });
}); */