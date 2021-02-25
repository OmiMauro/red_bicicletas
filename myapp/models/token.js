var mongose = require('mongoose');
var Schema = mongose.Schema;

var tokenSchema = new Schema({
    _userId: {
        type: mongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 43200,
        required: true

    }
});

module.exports = mongose.model('Token', tokenSchema);