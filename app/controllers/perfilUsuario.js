const config        = require('../config/config');
var UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
var validator = require("email-validator");
const PerfilUsuario = require('../models/perfilUsuario');

exports.perfilUsuarioListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const perfilUsuario = await PerfilUsuario.findById(id);        
        console.log('perfilUsuarioListar', { id }, perfilUsuario);
        if (perfilUsuario){
            callback({status: 200, mensagem: 'Perfil de Usuário localizado com sucesso.', dados: perfilUsuario}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o cadastro do perfil deusuário solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do perfil de usuário.', erro: erro}); 
    }                              
};  

exports.perfilUsuarioListarTodos = async function(req, callback){
    try{        
        const perfilUsuario = await PerfilUsuario.find();        
        console.log('perfilUsuarioListarTodos', perfilUsuario);
        if (perfilUsuario){
            callback({status: 200, mensagem: 'Perfil de usuários localizados com sucesso.', dados: perfilUsuario}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum cadastro de perfil de usuário foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do perfil de usuário.', erro: erro}); 
    }                              
};  

exports.perfilUsuarioCadastrar = async function(req, callback){
    try{        
        const perfilUsuario = await PerfilUsuario.create(req.body);
        callback({status: 201, mensagem: 'Perfil de usuário cadastrado com sucesso', _id: perfilUsuario._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro do perfil de usuário.', erro: erro}); 
    }                         
}; 

exports.perfilUsuarioAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const perfilUsuario = await PerfilUsuario.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Perfil de usuário atualizado com sucesso', _id: perfilUsuario._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do perfil de usuário.', erro: erro}); 
    }                         
}; 

exports.perfilUsuarioExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const perfilUsuario = await PerfilUsuario.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Perfil de usuário excluído com sucesso', _id: perfilUsuario._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do perfil de usuário.', erro: erro}); 
    }                         
}; 
