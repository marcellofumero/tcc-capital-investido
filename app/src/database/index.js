const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/capitalinvestido', { useMongoCliente: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;