var mongose = require('mongoose');
var moment = require('moment');
var Schema = mongose.Schema;

var reservaSchema = new Schema({
    usuario: { type: mongose.Schema.Types.ObjectId, ref: 'Usuario' },
    bicicleta: { type: mongose.Schema.Types.ObjectId, ref: 'Bicicleta' },
    desde: Date,
    hasta: Date,
    // comentario: [{ type: String }] //esto es la definicion de un arreglo. Puede haber varios comentarios por una reserva
});

reservaSchema.methods.diasDeReserva = function() {
    return moment(this.hasta).diff(moment(this.hasta), 'dias') + 1;
};
reservaSchema.statics.createInstance = function(usuario, bicicleta, desde, hasta) {
    return new this({
        usuario: usuario,
        bicicleta: bicicleta,
        desde: desde,
        hasta: hasta
    });
};

reservaSchema.statics.buscarReservaById = function(id) {
    return this.findOne({ _id: id }, cb)
};
reservaSchema.statics.addReserva = function(unaReserva, cb) {
    this.create(unaReserva, cb);
};

reservaSchema.statics.removeById = function(id, cb) {
    return this.deleteOne({ _id: id }, cb);
};

module.exports = mongose.model('Reserva', reservaSchema);