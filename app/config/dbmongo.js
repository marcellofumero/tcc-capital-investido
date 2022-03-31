const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongo_capitalinvestido:cap-invest-123@capitalinvestido.7icji.mongodb.net/capitalinvestido?retryWrites=true&w=majority');
//mongoose.connect('mongodb://127.0.0.1/capitalinvestido');
//mongoose.connect('mongodb://127.0.0.1/capitalinvestido', { useMongoCliente: true});
//mongoose.Promise = global.Promise;

module.exports = mongoose;