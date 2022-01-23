const mongoose = require('../config/dbmongo');

const PerfilUsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },    
    createAt: {
        type: Date,        
        dafault: Date.now
    }
},{ timestamps: {} });

const PerfilUsuario = mongoose.model('PerfilUsuario', PerfilUsuarioSchema);

module.exports = PerfilUsuario;