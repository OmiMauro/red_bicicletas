var Bicicleta = require('../../models/bicicleta');
var mongoose = require('mongoose');

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

describe('Bicicleta Mongo', () => {


    describe('Bicicleta.createInstance', () => {
        it('Se agrego un nueva bici', (done) => {
            var bici = Bicicleta.createInstance(1, 'verde', 'mtb', [12.4, 16.3]);
            /* Bicicleta.allBicis(function(err, bicis) {
                expect(bicis[0].code).toEqual(1);
                expect(bicis[0].color).toBe(bici.color);
                expect(bicis[0].modelo).toBe(bici.modelo);
                /* expect(bicis[0].ubicacion[0]).toEqual(bici.ubicacion[0]);
                expect(bicis[0].ubicacion[1]).toEqual(bici.ubicacion[1]); */
            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('mtb');
            expect(bici.ubicacion[0]).toEqual(12.4);
            expect(bici.ubicacion[1]).toEqual(16.3);
            done();
        });
    });
    describe('Bicicletas.allBicis. ', () => {
        it('Is empty..', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                console.log('Cantidad de bicis: ' + bicis.length);
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    describe('Bicicleta.add', () => {
        it('Se agrega una bicicleta', (done) => {
            var unaBici = new Bicicleta({ code: 3, color: 'rojo', modelo: 'ruta' });
            Bicicleta.agregarBici(unaBici, function(err, newBici) {
                if (err) console.error(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toEqual(3);
                    done();
                });
            });
        });
    });
    describe('Bicicleta.findByCode', () => {
        it('Debe devolver la bici con el code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                var unaBici = new Bicicleta({ code: 1, color: 'rojo', modelo: 'ruta' });
                Bicicleta.agregarBici(unaBici, function(err, newBici) {
                    if (err) console.error(err);
                    var unaBici2 = new Bicicleta({ code: 5, color: 'verde', modelo: 'mtb' });
                    Bicicleta.agregarBici(unaBici, function(err, newBici) {
                        if (err) console.error(err);
                        Bicicleta.findByCode(1, function(err, targetBici) {
                            expect(targetBici.code).toEqual(unaBici.code);
                            expect(targetBici.color).toBe(unaBici.color);
                            expect(targetBici.modelo).toBe(unaBici.modelo);
                            done();
                        });

                    });
                });
            });
        });
    });
    describe('Bicicleta.removeByCode.', () => {
        it('Se elimina una bicicleta.', (done) => {
            var unaBici = new Bicicleta({ code: 4, color: 'rojo', modelo: 'ruta' });
            Bicicleta.agregarBici(unaBici, function(err, newBici) {
                if (err) console.err('error.' + err);
                Bicicleta.removeById(4, function(err, targetBici) {
                    expect(newBici.code).toEqual(4);
                    done();
                });
            });
        });
    });

})













/* 

beforeEach(() => { Bicicleta.allBicis = []; });
describe('Bicicleta.allBicis validar', () => {
    it('Empieza vacio el arreglo.', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });

});

describe('Bicicleta.add.', () => {
    it('agregar una bicicleta. ', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var kore = new Bicicleta(1, 'Beige', 'MTB', 'JA');
        Bicicleta.agregarBici(kore);
        expect(Bicicleta.allBicis[0]).toEqual(kore);
        expect(Bicicleta.allBicis.length).toBe(1);
    });
});

describe('Bicicleta.findById ', () => {
    it('Devuelva la bici con id 1. ', () => {
        var kore = new Bicicleta(1, 'verde', 'MTB', 'JA');
        var slp = new Bicicleta(2, 'naranja', 'ruta', 'Irigoyen');

        Bicicleta.agregarBici(slp);
        Bicicleta.agregarBici(kore);
        var unaBici = Bicicleta.findBiciById(1);

        expect(unaBici.id).toBe(1);
        expect(unaBici.color).toBe('verde');
        expect(unaBici.modelo).toBe('MTB');
    });


    moment
}); */