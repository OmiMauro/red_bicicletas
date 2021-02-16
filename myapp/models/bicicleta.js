var Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function() {
    return "id: " + this.id + "| color: " + this.color;
}

Bicicleta.allBicis = [];
Bicicleta.agregarBici = function(unaBici) {
    Bicicleta.allBicis.push(unaBici);
}

var kore = new Bicicleta(1, 'Beige', 'MTB', 'JA');
var slp = new Bicicleta(2, 'rojo/azul', 'MTB', 'JA');

Bicicleta.agregarBici(kore);
Bicicleta.agregarBici(slp);
Bicicleta.agregarBici(slp);
Bicicleta.agregarBici(slp);

module.exports = Bicicleta;