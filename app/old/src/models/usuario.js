const mongoose = require('../database');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createAt: {
        type: Date,
        dafault: Date.now,
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;