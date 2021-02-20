var Bicicleta = require('../../models/bicicleta');

exports.bicicletas_list = function(req, res) {
    res.status(200).json({ bicis: Bicicleta.allBicis });
}
exports.bicicletas_create = function(req, res) {
    res.render('/bicicletas/create');
}
exports.bicicletas_createP = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.long];
    Bicicleta.agregarBici(bici);
    res.status(200).json({ bicicleta: bici });
}


exports.bicicletas_update = function(req, res) {

}

exports.bicicletas_delete = function(req, res) {

}