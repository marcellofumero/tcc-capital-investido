const config = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();
const validator = require("email-validator");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.usuarioAutenticar = async function(req, callback){
    try{
        const { email, password } = req.body;                
        const usuario = await Usuario.findOne({ email }).select('+password');
        
        if (!usuario){
            callback({status: 400, mensagem: 'Usuário não encontrado.'});
        }

        if (!await bcrypt.compare(password, usuario.password)){
            callback({status: 400, mensagem: 'Senha inválida para o usuário informado.'});
        }
        
        usuario.password = undefined;        
        const token = Acesso.gerarTokenAcesso( usuario.id );

        callback({status: 200, mensagem: 'Usuário autenticado com sucesso.', dados: usuario, token: token});
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar autenticar o usuário.', erro: erro}); 
    }                              
}; 

exports.usuarioListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const usuario = await Usuario.findById(id);        
        
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
        const token = Acesso.gerarTokenAcesso( usuario.id );

        callback({status: 201, mensagem: 'Usuário cadastrado com sucesso', _id: usuario._id, token: token});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro do usuário.', erro: erro}); 
    }                         
};  

