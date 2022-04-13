const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const ListaVip = require('../models/listaVip');

exports.listaVipListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const listaVip = await ListaVip.findById(id).populate('tipoInvestimento');        
        
        if (listaVip){
            callback({status: 200, mensagem: 'Registro localizado com sucesso.', dados: listaVip}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o registro solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.listaVipListarTodos = async function(req, callback){
    try{        
        const listaVip = await ListaVip.find().populate('tipoInvestimento');        
        
        if (listaVip){
            callback({status: 200, mensagem: 'Registros localizados com sucesso.', dados: listaVip}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum registro foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.listaVipCadastrar = async function(req, callback){
    try{        
        const listaVip = await ListaVip.create(req.body);
        callback({status: 201, mensagem: 'Registro cadastrado com sucesso', _id: listaVip._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro.', erro: erro}); 
    }                         
}; 

exports.listaVipAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const listaVip = await ListaVip.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Registro atualizado com sucesso', _id: listaVip._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do registro.', erro: erro}); 
    }                         
}; 

exports.listaVipExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const listaVip = await ListaVip.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Registro excluído com sucesso', _id: listaVip._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do registro.', erro: erro}); 
    }                         
}; 
