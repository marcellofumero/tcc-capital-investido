const config        = require('../config/config');
var UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
var validator = require("email-validator");
const Usuario = require('../models/usuario');

exports.usuarioListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const usuario = await Usuario.findById(id);        
        console.log('usuarioListar', { id }, usuario);
        if (usuario){
            callback({status: 200, mensagem: 'Usuário localizado com sucesso.', dados: usuario}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o cadastro do usuário solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioListarTodos = async function(req, callback){
    try{        
        const usuario = await Usuario.find();        
        console.log('usuarioListarTodos', usuario);
        if (usuario){
            callback({status: 200, mensagem: 'Usuários localizados com sucesso.', dados: usuario}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum cadastro de usuário foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioCadastrar = async function(req, callback){
    try{        
        const usuario = await Usuario.create(req.body);
        callback({status: 201, mensagem: 'Usuário cadastrado com sucesso', _id: usuario._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro do usuário.', erro: erro}); 
    }                         
};  

