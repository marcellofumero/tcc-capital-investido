const mongoose = require('../config/dbmongo');

const RoboSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },    
    data: {
        type: Date,        
        dafault: Date.now
    },
    percentual_acerto: {
        type: String,
    }, 
    foto: {
        type: String,
    }, 
    preco: {
        type: Number,
    },
    diretorio_download: {
        type: String,
    },          
    status: {
        type: String,
        required: true,
        dafault: 'Ativo'
    },
    tipoInvestimento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TipoInvestimento',            
    },
    modalidadeInvestimento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ModalidadeInvestimento',            
    },
    createAt: {
        type: Date,        
        dafault: Date.now
    }
},{ timestamps: {} });

const Robo = mongoose.model('Robo', RoboSchema);

module.exports = Robo;