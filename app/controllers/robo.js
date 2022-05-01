const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Robo = require('../models/robo');

exports.roboListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const robo = await Robo.findById(id);        
        
        if (robo){
            callback({status: 200, mensagem: 'Registro localizado com sucesso.', dados: robo}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o registro solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.roboListarTodos = async function(req, callback){
    try{        
        const robo = await Robo.find();        
        
        if (robo){
            callback({status: 200, mensagem: 'Registros localizados com sucesso.', dados: robo}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum registro foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.roboCadastrar = async function(req, callback){
    try{   
        req.body.diretorio_download = req.file.originalname;     
        const robo = await Robo.create(req.body);
        callback({status: 201, mensagem: 'Registro cadastrado com sucesso', _id: robo._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro.', erro: erro}); 
    }                         
}; 

exports.roboAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const robo = await Robo.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Registro atualizado com sucesso', _id: robo._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do registro.', erro: erro}); 
    }                         
}; 

exports.roboExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const robo = await Robo.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Registro excluído com sucesso', _id: robo._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do registro.', erro: erro}); 
    }                         
}; 
