const mongoose = require('../config/dbmongo');

const AvisoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        required: true,
    },    
    data: {
        type: Date,        
        dafault: Date.now
    },    
    status: {
        type: String,
        required: true,
        dafault: 'Ativo'
    },
    createAt: {
        type: Date,        
        dafault: Date.now
    }
},{ timestamps: {} });

const Aviso = mongoose.model('Aviso', AvisoSchema);

module.exports = Aviso;