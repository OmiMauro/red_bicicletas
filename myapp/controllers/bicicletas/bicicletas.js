var Bicicleta = require('../../models/bicicleta');

exports.bicicletas_list = function(req, res) {
    res.render('bicicletas/index', { bicis: Bicicleta.allBicis });
}