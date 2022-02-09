const mongoose = require('../config/dbmongo');
const bcrypt = require('bcryptjs');

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
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    perfil: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'PerfilUsuario',
        required: true     
    },
    status: {
        type: String,
        required: true,
        dafault: 'Ativo'
    },
    createAt: {
        type: Date,
        dafault: Date.now,
    }
},{ timestamps: {} });

UsuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;