// const mongoose = require("mongoose");
const mongoose = require("../../../common/connectionMongoDB");

const logSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createAt: {
    type: Date,
    dafault: Date.now
  }
},
{ collection: "usuarios" }
);

module.exports = mongoose.model("usuarios", logSchema);
