const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Aviso = require('../models/aviso');

exports.avisoListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const aviso = await Aviso.findById(id);        
        
        if (aviso){
            callback({status: 200, mensagem: 'Registro localizado com sucesso.', dados: aviso}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o registro solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.avisoListarTodos = async function(req, callback){
    try{        
        const aviso = await Aviso.find();        
        
        if (aviso){
            callback({status: 200, mensagem: 'Registros localizados com sucesso.', dados: aviso}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum registro foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.avisoCadastrar = async function(req, callback){
    try{        
        const aviso = await Aviso.create(req.body);
        callback({status: 201, mensagem: 'Registro cadastrado com sucesso', _id: aviso._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro.', erro: erro}); 
    }                         
}; 

exports.avisoAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const aviso = await Aviso.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Registro atualizado com sucesso', _id: aviso._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do registro.', erro: erro}); 
    }                         
}; 

exports.avisoExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const aviso = await Aviso.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Registro excluído com sucesso', _id: aviso._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do registro.', erro: erro}); 
    }                         
}; 
