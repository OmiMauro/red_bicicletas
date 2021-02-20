var Bicicleta = require('../../models/bicicleta');

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
});