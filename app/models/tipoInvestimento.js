const mongoose = require('../config/dbmongo');

const TipoInvestimentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },    
    createAt: {
        type: Date,        
        dafault: Date.now
    }
},{ timestamps: {} });

const TipoInvestimento = mongoose.model('TipoInvestimento', TipoInvestimentoSchema);

module.exports = TipoInvestimento;