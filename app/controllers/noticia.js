const config        = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Noticia = require('../models/noticia');

exports.noticiaListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const noticia = await Noticia.findById(id);        
        
        if (noticia){
            callback({status: 200, mensagem: 'Registro localizado com sucesso.', dados: noticia}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o registro solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.noticiaListarTodos = async function(req, callback){
    try{        
        const noticia = await Noticia.find();        
        
        if (noticia){
            callback({status: 200, mensagem: 'Registros localizados com sucesso.', dados: noticia}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum registro foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o registro.', erro: erro}); 
    }                              
};  

exports.noticiaCadastrar = async function(req, callback){
    try{        
        const noticia = await Noticia.create(req.body);
        callback({status: 201, mensagem: 'Registro cadastrado com sucesso', _id: noticia._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro.', erro: erro}); 
    }                         
}; 

exports.noticiaAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const noticia = await Noticia.findByIdAndUpdate(id, req.body);

        callback({status: 201, mensagem: 'Registro atualizado com sucesso', _id: noticia._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do registro.', erro: erro}); 
    }                         
}; 

exports.noticiaExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const noticia = await Noticia.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Registro excluído com sucesso', _id: noticia._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do registro.', erro: erro}); 
    }                         
}; 
