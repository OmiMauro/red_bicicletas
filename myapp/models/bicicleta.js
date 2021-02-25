/*Creando un esquema a la BD */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletasSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }
    },
    fecha: { type: Date, default: Date.now }
});
bicicletasSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};
bicicletasSchema.methods.toString = function() {
    return "code:" + this.code + " | color: " + this.color;
};
bicicletasSchema.statics.allBicis = function(cb) {
    return this.find({}, cb);
};
bicicletasSchema.statics.agregarBici = function(unaBici, cb) {
    this.create(unaBici, cb);
};
bicicletasSchema.statics.findByCode = function(unCode, cb) {
    return this.findOne({ code: unCode }, cb);
};
bicicletasSchema.statics.removeById = function(unCode, cb) {
    return this.deleteOne({ code: unCode }, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletasSchema);




/* 
//Codigo anterior
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
    var unaBici = Bicicleta.allBicis.find(x => x.id == idBici);
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

module.exports = Bicicleta; */