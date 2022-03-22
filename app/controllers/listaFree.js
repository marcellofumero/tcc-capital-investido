const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const ListaFree = require('../models/listaFree');

exports.listaFreeListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const listaFree = await ListaFree.findById(id).populate('tipoInvestimento');        
        
        if (listaFree){
            callback({status: 200, mensagem: 'Registro localizado com sucesso.', dados: listaFree}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o registro solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.listaFreeListarTodos = async function(req, callback){
    try{        
        const listaFree = await ListaFree.find().populate('tipoInvestimento');        
        
        if (listaFree){
            callback({status: 200, mensagem: 'Registros localizados com sucesso.', dados: listaFree}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum registro foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.listaFreeCadastrar = async function(req, callback){
    try{        
        const listaFree = await ListaFree.create(req.body);
        callback({status: 201, mensagem: 'Registro cadastrado com sucesso', _id: listaFree._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro.', erro: erro}); 
    }                         
}; 

exports.listaFreeAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const listaFree = await ListaFree.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Registro atualizado com sucesso', _id: listaFree._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do registro.', erro: erro}); 
    }                         
}; 

exports.listaFreeExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const listaFree = await ListaFree.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Registro excluído com sucesso', _id: listaFree._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do registro.', erro: erro}); 
    }                         
}; 
