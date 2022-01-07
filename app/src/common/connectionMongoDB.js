const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/capitalinvestido");
// mongoose.connect('mongodb://127.0.0.1/capitalinvestido', { useMongoCliente: true});
// mongoose.Promise = global.Promise;

module.exports = mongoose;
