const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const TipoInvestimento = require('../models/tipoInvestimento');

exports.tipoInvestimentoListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const tipoInvestimento = await TipoInvestimento.findById(id);        
        
        if (tipoInvestimento){
            callback({status: 200, mensagem: 'Tipo de investimento localizado com sucesso.', dados: tipoInvestimento}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o tipo de investimento solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o tipo de investimento.', erro: erro}); 
    }                              
};  

exports.tipoInvestimentoListarTodos = async function(req, callback){
    try{        
        const tipoInvestimento = await TipoInvestimento.find();        
        
        if (tipoInvestimento){
            callback({status: 200, mensagem: 'Tipo de investimentos localizados com sucesso.', dados: tipoInvestimento}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum cadastro de tipo de investimento foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do tipo de investimento.', erro: erro}); 
    }                              
};  

exports.tipoInvestimentoCadastrar = async function(req, callback){
    try{        
        const tipoInvestimento = await TipoInvestimento.create(req.body);
        callback({status: 201, mensagem: 'Tipo de investimento cadastrado com sucesso', _id: tipoInvestimento._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro do tipo de investimento.', erro: erro}); 
    }                         
}; 

exports.tipoInvestimentoAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const tipoInvestimento = await TipoInvestimento.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Tipo de investimento atualizado com sucesso', _id: tipoInvestimento._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do tipo de investimento.', erro: erro}); 
    }                         
}; 

exports.tipoInvestimentoExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const tipoInvestimento = await TipoInvestimento.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Tipo de investimento excluído com sucesso', _id: tipoInvestimento._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do tipo de investimento.', erro: erro}); 
    }                         
}; 
