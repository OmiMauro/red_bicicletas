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

Bicicleta.findBiciById = function(idBici) {
    var unaBici = Bicicleta.allBicis.find(x => x.id === idBici);
    if (unaBici) {
        return unaBici;
    } else {
        throw new Error(`No existe una bici con el id: ${idBici}`);
    }

}
Bicicleta.updateBiciById = function(id) {

}
Bicicleta.deleteBiciById = function(idBici) {
    for (let i = 0; i < Bicicleta.length; i++) {
        if (Bicicleta.allBicis[i].id === idBici) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }

    }
}

// var slp = new Bicicleta(2, 'rojo/azul', 'MTB', 'JA');

// Bicicleta.agregarBici(kore);
// Bicicleta.agregarBici(slp);
// Bicicleta.agregarBici(slp);
// Bicicleta.agregarBici(slp);

module.exports = Bicicleta;