const mongoose = require('../config/dbmongo');

const ListaVipSchema = new mongoose.Schema({
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
    tipoInvestimento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TipoInvestimento',            
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

const ListaVip = mongoose.model('ListaVip', ListaVipSchema);

module.exports = ListaVip;