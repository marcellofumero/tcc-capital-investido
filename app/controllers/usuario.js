const config        = require('../config/config');
var UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
var validator = require("email-validator");
const Usuario = require('../models/usuario');

exports.usuarioCadastrar = async function(req, callback){
    const usuario = await Usuario.create(req.body);
    console.log('exemploCadastrarUsuarioMongo',usuario);
    callback({mensagem: 'Falha ao tentar executar a operação: '});
                               
};  

