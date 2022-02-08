const config = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();
const validator = require("email-validator");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../functions/mailer');

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

exports.usuarioAutenticar = async function(req, callback){
    try{
        const { email, password } = req.body;                
        const usuario = await Usuario.findOne({ email }).select('+password');
        
        if (!usuario){
            callback({status: 400, mensagem: 'Usuário não encontrado.'});
            return;
        }

        if (!await bcrypt.compare(password, usuario.password)){
            callback({status: 400, mensagem: 'Senha inválida para o usuário informado.'});
            return;
        }
        
        usuario.password = undefined;        
        const token = Acesso.gerarTokenAcesso( usuario.id );

        callback({status: 200, mensagem: 'Usuário autenticado com sucesso.', dados: usuario, token: token});
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar autenticar o usuário.', erro: erro}); 
    }                              
}; 

exports.usuarioEsqueciSenha = async function(req, callback){
    try{
        const { email } = req.body;
        
        const usuario = await Usuario.findOne({ email });        
        
        if (usuario){
            const token = crypto.randomBytes(20).toString('hex');
            
            const now = new Date();
            now.setHours( now.getHours() + 1 );

            await Usuario.findByIdAndUpdate( usuario.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });

            mailer.sendMail({
                to: email,
                from: '<Capital Investido>capitalinvestido@capitalinvestido.com.br',
                subject: 'Recuperação de senha',
                template: 'usuario/esqueci-senha',
                context: { token },
            }, (erro) => {
                if (erro)
                    callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar enviar o e-mail para redefinir a senha do usuário.', erro: erro});
                else    
                    callback({status: 200, mensagem: 'Foi enviado ao seu e-mail as instruções para realizar a troca de senha!', dados: usuario});     
            });
            
            
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o cadastro do usuário solicitado para resetar a senha.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar iniciar o processo para redefinir a senha do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioResetarSenha = async function(req, callback){
    try{
        const { email , token , password } = req.body;
        
        const usuario = await Usuario.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');        
        
        if (!usuario){
            callback({status: 400, mensagem: 'Não foi localizado o cadastro do usuário solicitado para resetar a senha.'}); 
            return;
        }
        
        if (token !== usuario.passwordResetToken){
            callback({status: 400, mensagem: 'Token inválido para redefinição de senha.'}); 
            return;
        }

        const now = Date();

        if (now > usuario.passwordResetExpires){
            callback({status: 400, mensagem: 'O tempo para resetar a senha expirou.'}); 
            return;
        }

        usuario.password = password;

        await usuario.save();

        callback({status: 200, mensagem: 'Senha alterada com sucesso.'}); 
        
        
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar redefinir a senha do usuário.', erro: erro}); 
    }                              
};  