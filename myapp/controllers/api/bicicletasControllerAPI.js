var Bicicleta = require('../../models/bicicleta');


exports.bicicletas_list = function(req, res) {
    res.status(200).json({ bicis: Bicicleta.allBicis });
}

exports.bicicletas_create = function(req, res) {
    var bici = new Bicicleta(req.body.code, req.body.color, req.body.modelo, req.body.ubicacion);
    //bici.ubicacion = [req.body.lat, req.body.long];
    Bicicleta.agregarBici(bici);
    res.status(200).json({ bicicleta: bici });
    res.redirect('/');
}

exports.bicicletas_crearView = function(req, res) {
    res.render('bicicletas/create');
    res.status(200);
}
exports.bicicletas_update = function(req, res) {

}

exports.bicicletas_delete = function(req, res) {

}