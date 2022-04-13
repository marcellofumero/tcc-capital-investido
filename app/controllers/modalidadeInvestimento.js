const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const ModalidadeInvestimento = require('../models/modalidadeInvestimento');

exports.modalidadeInvestimentoListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const modalidadeInvestimento = await ModalidadeInvestimento.findById(id);        
        
        if (modalidadeInvestimento){
            callback({status: 200, mensagem: 'Modalidade de investimento localizada com sucesso.', dados: modalidadeInvestimento}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado a modalidade de investimento solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar a modalidade de investimento.', erro: erro}); 
    }                              
};  

exports.modalidadeInvestimentoListarTodos = async function(req, callback){
    try{        
        const modalidadeInvestimento = await ModalidadeInvestimento.find();        
        
        if (modalidadeInvestimento){
            callback({status: 200, mensagem: 'Modalidade de investimentos localizadas com sucesso.', dados: modalidadeInvestimento}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum cadastro de modalidade de investimento foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do modalidade de investimento.', erro: erro}); 
    }                              
};  

exports.modalidadeInvestimentoCadastrar = async function(req, callback){
    try{        
        const modalidadeInvestimento = await ModalidadeInvestimento.create(req.body);
        callback({status: 201, mensagem: 'Modalidade de investimento cadastrada com sucesso', _id: modalidadeInvestimento._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro da modalidade de investimento.', erro: erro}); 
    }                         
}; 

exports.modalidadeInvestimentoAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const modalidadeInvestimento = await ModalidadeInvestimento.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Modalidade de investimento atualizada com sucesso', _id: modalidadeInvestimento._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização da modalidade de investimento.', erro: erro}); 
    }                         
}; 

exports.modalidadeInvestimentoExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const modalidadeInvestimento = await ModalidadeInvestimento.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Modalidade de investimento excluída com sucesso', _id: modalidadeInvestimento._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão da modalidade de investimento.', erro: erro}); 
    }                         
}; 
