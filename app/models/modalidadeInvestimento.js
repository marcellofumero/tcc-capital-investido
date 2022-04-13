const mongoose = require('../config/dbmongo');

const ModalidadeInvestimentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },    
    createAt: {
        type: Date,        
        dafault: Date.now
    }
},{ timestamps: {} });

const ModalidadeInvestimento = mongoose.model('ModalidadeInvestimento', ModalidadeInvestimentoSchema);

module.exports = ModalidadeInvestimento;